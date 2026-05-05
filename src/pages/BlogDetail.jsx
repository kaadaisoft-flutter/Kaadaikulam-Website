import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Calendar, User, ArrowLeft, ArrowRight, Clock, Share2, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addComment, subscribeComments } from '../services/blogService';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentForm, setCommentForm] = useState({ name: '', text: '' });
    const [submitting, setSubmitting] = useState(false);
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
                    const blogData = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
                    setBlog(blogData);

                    // Fetch recent blogs (excluding current)
                    const recentQ = query(
                        collection(db, 'blogs'),
                        orderBy('createdAt', 'desc'),
                        limit(4)
                    );
                    const recentSnapshot = await getDocs(recentQ);
                    setRecentBlogs(recentSnapshot.docs
                        .map(doc => ({ id: doc.id, ...doc.data() }))
                        .filter(b => b.id !== blogData.id)
                        .slice(0, 3)
                    );

                    // Subscribe to comments
                    const unsubComments = subscribeComments(blogData.id, (data) => {
                        setComments(data);
                    });
                    return () => unsubComments();
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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentForm.name || !commentForm.text) return;
        
        setSubmitting(true);
        try {
            await addComment(blog.id, {
                userName: commentForm.name,
                content: commentForm.text
            });
            setCommentForm({ name: '', text: '' });
            toast.success("Comment posted successfully!");
        } catch (err) {
            toast.error("Failed to post comment");
        } finally {
            setSubmitting(false);
        }
    };

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
            {/* Hero Section */}
            <header className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
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

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20">
                {/* Main Content Area */}
                <div className="lg:col-span-8 py-16 md:py-24">
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

                    {blog.shortDescription && (
                        <div className="relative mb-20">
                            <div className="absolute -left-8 top-0 bottom-0 w-1 bg-primary/20 rounded-full"></div>
                            <p className="text-2xl md:text-3xl text-stone-700 font-serif italic leading-relaxed">
                                {blog.shortDescription}
                            </p>
                        </div>
                    )}

                    <div 
                        className="prose prose-stone prose-2xl max-w-none 
                            prose-headings:font-serif prose-headings:font-bold prose-headings:text-stone-900 
                            prose-p:text-stone-600 prose-p:leading-[1.8] prose-p:text-xl
                            prose-img:rounded-[2.5rem] prose-img:shadow-2xl
                            prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                            prose-blockquote:border-primary prose-blockquote:bg-stone-50/50 prose-blockquote:p-12 prose-blockquote:rounded-[2rem] prose-blockquote:not-italic prose-blockquote:font-serif prose-blockquote:text-2xl"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Tags & Sharing */}
                    <div className="mt-24 pt-12 border-t border-stone-100 flex flex-wrap items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <Tag size={20} className="text-primary/40" />
                            <div className="flex flex-wrap gap-2">
                                {blog.tags?.split(',').map((tag, idx) => (
                                    <span key={idx} className="text-[10px] font-black text-stone-400 bg-stone-100 px-4 py-2 rounded-xl tracking-widest uppercase">
                                        #{tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                toast.success("Link copied!");
                            }}
                            className="flex items-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all duration-500 shadow-xl"
                        >
                            <Share2 size={18} />
                            Share Story
                        </button>
                    </div>

                    {/* Comments Section */}
                    <section className="mt-32">
                        <div className="flex items-center gap-4 mb-12">
                            <h3 className="text-4xl font-serif font-bold text-stone-900">Community Thoughts</h3>
                            <div className="flex-1 h-[1px] bg-stone-100"></div>
                            <span className="text-primary font-serif font-bold text-2xl">({comments.length})</span>
                        </div>

                        {/* Comment Form */}
                        <form onSubmit={handleCommentSubmit} className="bg-white rounded-[2.5rem] p-10 md:p-12 border border-stone-100 shadow-sm mb-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Your Name</label>
                                    <input 
                                        type="text"
                                        required
                                        value={commentForm.name}
                                        onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                                        placeholder="Full Name"
                                        className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3 mb-8">
                                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Your Message</label>
                                <textarea 
                                    required
                                    rows="4"
                                    value={commentForm.text}
                                    onChange={(e) => setCommentForm({ ...commentForm, text: e.target.value })}
                                    placeholder="What are your thoughts?"
                                    className="w-full bg-stone-50 border-none rounded-[2rem] px-6 py-6 focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                                ></textarea>
                            </div>
                            <button 
                                type="submit"
                                disabled={submitting}
                                className="w-full md:w-auto px-12 py-5 bg-stone-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-primary disabled:opacity-50 transition-all duration-500 shadow-xl"
                            >
                                {submitting ? 'Posting...' : 'Post Thought'}
                            </button>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-8">
                            {comments.map((comment) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={comment.id} 
                                    className="bg-white/50 p-8 md:p-10 rounded-[2.5rem] border border-stone-100/50"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {comment.userName.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-stone-900">{comment.userName}</h4>
                                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{formatDate(comment.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-stone-600 leading-relaxed text-lg italic pl-16">
                                        "{comment.content}"
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar - Recent Blogs */}
                <aside className="lg:col-span-4 py-16 lg:py-24 space-y-16 lg:sticky lg:top-0 lg:h-fit">
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <h3 className="text-2xl font-serif font-bold text-stone-900 shrink-0">Recent Stories</h3>
                            <div className="flex-1 h-[1px] bg-stone-100"></div>
                        </div>
                        <div className="space-y-10">
                            {recentBlogs.map((recent) => (
                                <Link to={`/blog/${recent.slug}`} key={recent.id} className="group flex gap-6 items-start">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-500">
                                        <img src={recent.image} alt={recent.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <span className="text-[9px] font-black text-primary uppercase tracking-widest mb-1 block">
                                            {recent.category}
                                        </span>
                                        <h4 className="font-serif font-bold text-stone-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                            {recent.title}
                                        </h4>
                                        <p className="text-[10px] text-stone-400 font-bold mt-2 uppercase tracking-widest">
                                            {formatDate(recent.publishDate || recent.createdAt)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter / Call to Action */}
                    <div className="bg-stone-900 rounded-[3rem] p-10 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px] rounded-full"></div>
                        <h4 className="text-2xl font-serif font-bold text-white mb-4 relative z-10">Join Our Journey</h4>
                        <p className="text-stone-400 text-sm mb-8 leading-relaxed relative z-10">Stay updated with our latest spiritual stories and festival announcements.</p>
                        <Link to="/contact" className="inline-block w-full py-4 bg-primary text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl relative z-10">
                            Contact Us
                        </Link>
                    </div>
                </aside>
            </div>

            <style>{`
                .prose h1, .prose h2, .prose h3 { margin-top: 4rem; margin-bottom: 2rem; color: #1c1917; }
                .prose p { margin-bottom: 2rem; }
                .prose img { width: 100%; height: auto; margin: 4rem 0; border-radius: 2.5rem; }
                .prose ul, .prose ol { margin-bottom: 2rem; padding-left: 2rem; }
                .prose li { margin-bottom: 1rem; }
                .prose blockquote p { font-size: 1.75rem; line-height: 1.5; color: #44403c; border-left: 4px solid #800000; padding-left: 2rem; }
            `}</style>
        </article>
    );
};

export default BlogDetail;
