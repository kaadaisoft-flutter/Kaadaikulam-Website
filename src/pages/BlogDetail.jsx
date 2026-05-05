import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Calendar, User, ArrowLeft, ArrowRight, Clock, Share2, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const q = query(
                    collection(db, 'blogs'), 
                    where('slug', '==', slug),
                    limit(1)
                );
                const querySnapshot = await getDocs(q);
                
                if (!querySnapshot.empty) {
                    setBlog({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() });
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
                toast.error("Failed to load blog post");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
        window.scrollTo(0, 0);
    }, [slug]);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Post Not Found</h1>
                <p className="text-gray-500 mb-8">The article you are looking for might have been moved or deleted.</p>
                <Link 
                    to="/blog" 
                    className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                    <ArrowLeft size={20} />
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-[#FDFBF7] pb-32">
            {/* Hero Section with Featured Image */}
            <header className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
                <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-10 left-10">
                    <Link 
                        to="/blog" 
                        className="flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white hover:text-primary transition-all duration-500 shadow-2xl border border-white/20"
                    >
                        <ArrowLeft size={28} />
                    </Link>
                </div>
            </header>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
                {/* Title and Metadata moved here */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap items-center gap-6 mb-8"
                    >
                        <span className="px-5 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                            {blog.category}
                        </span>
                        <div className="flex items-center gap-2 text-stone-400 text-[10px] font-bold uppercase tracking-widest">
                            <Calendar size={14} className="text-primary/40" />
                            {formatDate(blog.publishDate || blog.createdAt)}
                        </div>
                        <div className="flex items-center gap-2 text-stone-400 text-[10px] font-bold uppercase tracking-widest">
                            <User size={14} className="text-primary/40" />
                            {blog.author || 'Admin'}
                        </div>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif font-bold text-stone-900 leading-[1.1] mb-12"
                    >
                        {blog.title}
                    </motion.h1>

                    <div className="h-[1px] w-full bg-stone-100"></div>
                </div>

                {/* Intro / Short Description */}
                {blog.shortDescription && (
                    <div className="relative mb-20">
                        <div className="absolute -left-8 top-0 bottom-0 w-1 bg-primary/20 rounded-full"></div>
                        <p className="text-2xl md:text-3xl text-stone-700 font-serif italic leading-relaxed">
                            {blog.shortDescription}
                        </p>
                    </div>
                )}

                {/* Main Content Rendered from HTML */}
                <div 
                    className="prose prose-stone prose-2xl max-w-none 
                        prose-headings:font-serif prose-headings:font-bold prose-headings:text-stone-900 
                        prose-p:text-stone-600 prose-p:leading-[1.8] prose-p:text-xl
                        prose-img:rounded-[2.5rem] prose-img:shadow-2xl
                        prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:border-primary prose-blockquote:bg-stone-50/50 prose-blockquote:p-12 prose-blockquote:rounded-[2rem] prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-2xl
                        prose-strong:text-stone-900"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Footer Section */}
                <footer className="mt-32 pt-16 border-t border-stone-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                        <div className="flex items-center gap-4">
                            <Tag size={20} className="text-primary/40" />
                            <div className="flex flex-wrap gap-3">
                                {blog.tags?.split(',').map((tag, idx) => (
                                    <span key={idx} className="text-[10px] font-black text-stone-400 bg-stone-100/50 px-4 py-2 rounded-xl uppercase tracking-widest">
                                        #{tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast.success("Link copied to clipboard!");
                                }}
                                className="flex items-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all duration-500 shadow-xl"
                            >
                                <Share2 size={18} />
                                Share Story
                            </button>
                        </div>
                    </div>

                    {/* Author Box */}
                    <div className="mt-24 bg-white rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-stone-100 shadow-sm">
                        <div className="w-28 h-28 rounded-[2rem] bg-stone-50 border border-stone-100 flex items-center justify-center text-primary font-serif font-bold text-5xl shadow-inner shrink-0">
                            {blog.author?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3 block">About the Author</span>
                            <h4 className="text-3xl font-serif font-bold text-stone-900 mb-4">{blog.author || 'Admin'}</h4>
                            <p className="text-stone-500 text-lg leading-relaxed max-w-xl">
                                Dedicated to preserving and sharing the rich cultural and spiritual heritage of Poondurai Kaadai. 
                                Our mission is to keep the community connected through timeless stories and updates.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>

            {/* More Posts Navigation */}
            <div className="max-w-7xl mx-auto px-6 pt-12 text-center">
                <Link 
                    to="/blog"
                    className="inline-flex items-center gap-4 text-primary font-black text-xs uppercase tracking-[0.3em] group hover:gap-8 transition-all duration-500"
                >
                    <div className="h-[1px] w-12 bg-primary/20"></div>
                    Explore More Stories
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>

            {/* Custom Styles for dangerouslySetInnerHTML content */}
            <style>{`
                .prose h1, .prose h2, .prose h3 { margin-top: 4rem; margin-bottom: 2rem; color: #1c1917; }
                .prose p { margin-bottom: 2rem; }
                .prose img { width: 100%; height: auto; margin: 4rem 0; }
                .prose ul, .prose ol { margin-bottom: 2rem; padding-left: 2rem; }
                .prose li { margin-bottom: 1rem; }
                .prose blockquote p { font-size: 1.75rem; line-height: 1.5; color: #44403c; }
            `}</style>
        </article>
    );
};

export default BlogDetail;
