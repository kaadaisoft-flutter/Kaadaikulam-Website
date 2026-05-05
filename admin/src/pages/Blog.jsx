import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';
import SlashEditor from '../components/SlashEditor';
import { 
    Plus, Edit2, Trash2, ArrowLeft, Send, Archive, 
    FileText, CheckCircle, Search, Filter, Calendar, 
    Eye, MoreVertical, LayoutGrid, List as ListIcon,
    AlertCircle, Sparkles, Clock, BarChart3, Tag
} from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { formatDate, toISODate } from '../utils/dateUtils';
import MediaPreview from '../components/MediaPreview';
import ImageUploadField from '../components/ImageUploadField';
import { generateSlug } from '../utils/slugUtils';
import { BLOG_CATEGORIES, BLOG_STATUS_OPTIONS } from '../constants';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { subscribeBlogs, saveBlog, deleteBlog } from '../services/blogService';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService';

const Blog = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id: routeId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form & UI States
    const [filePreview, setFilePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSelection, setPreviewSelection] = useState({ isOpen: false, media: null });
    const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, id: null });
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    const id = routeId || (location.pathname.includes('/edit/') ? location.pathname.split('/').pop() : null);
    const isAddPage = location.pathname.endsWith('/blog/add');
    const isEditPage = !!id && (location.pathname.includes('/edit/') || location.pathname.includes('/blog/edit/'));

    useEffect(() => {
        const unsubscribe = subscribeBlogs((data) => {
            setItems(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const { control, register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            slug: '',
            category: BLOG_CATEGORIES[0],
            shortDescription: '',
            content: '',
            status: BLOG_STATUS_OPTIONS[0],
            metaTitle: '',
            metaDescription: '',
            focusKeyword: '',
            tags: '',
            publishDate: toISODate(new Date()),
            imageAlt: '',
        },
    });

    const titleValue = watch('title');
    const contentValue = watch('content');
    const slugValue = watch('slug');
    const focusKeywordValue = watch('focusKeyword');
    const metaDescriptionValue = watch('metaDescription');

    // Auto-slug generation
    useEffect(() => {
        if (!isEditPage && !slugManuallyEdited && titleValue) {
            setValue('slug', generateSlug(titleValue));
        }
    }, [isEditPage, titleValue, slugManuallyEdited, setValue]);

    // Form initialization
    useEffect(() => {
        if (isEditPage && id && items.length > 0) {
            const item = items.find((i) => i.id === id);
            if (item) {
                reset({
                    title: item.title || '',
                    slug: item.slug || '',
                    category: BLOG_CATEGORIES.find((c) => c.value === item.category) || BLOG_CATEGORIES[0],
                    shortDescription: item.shortDescription || '',
                    content: item.content || '',
                    status: BLOG_STATUS_OPTIONS.find((s) => s.value === (item.status || 'Draft')) || BLOG_STATUS_OPTIONS[0],
                    metaTitle: item.metaTitle || '',
                    metaDescription: item.metaDescription || '',
                    focusKeyword: item.focusKeyword || '',
                    tags: item.tags || '',
                    publishDate: item.publishDate?.seconds ? toISODate(new Date(item.publishDate.seconds * 1000)) : item.publishDate || toISODate(new Date()),
                    imageAlt: item.imageAlt || '',
                });
                setFilePreview(item.image);
                setSlugManuallyEdited(true);
            }
        } else if (isAddPage) {
            reset({
                title: '',
                slug: '',
                category: BLOG_CATEGORIES[0],
                shortDescription: '',
                content: '',
                status: BLOG_STATUS_OPTIONS[0],
                metaTitle: '',
                metaDescription: '',
                focusKeyword: '',
                tags: '',
                publishDate: toISODate(new Date()),
                imageAlt: '',
            });
            setFilePreview(null);
            setSelectedFile(null);
            setSlugManuallyEdited(false);
        }
    }, [isEditPage, isAddPage, id, items, reset]);

    // SEO & Stats Calculations
    const wordCount = useMemo(() => {
        const text = contentValue?.replace(/<[^>]*>/g, ' ').trim();
        return text ? text.split(/\s+/).length : 0;
    }, [contentValue]);

    const readTime = Math.ceil(wordCount / 200) || 1;

    const seoScore = useMemo(() => {
        if (!focusKeywordValue) return 0;
        let score = 0;
        const kw = focusKeywordValue.toLowerCase();
        const t = titleValue?.toLowerCase() || '';
        const d = metaDescriptionValue?.toLowerCase() || '';
        const c = contentValue?.toLowerCase() || '';

        if (t.includes(kw)) score += 30;
        if (d.includes(kw)) score += 20;
        if (c.includes(kw)) score += 20;
        if (wordCount > 300) score += 15;
        if (d.length >= 120 && d.length <= 160) score += 15;
        return score;
    }, [focusKeywordValue, titleValue, metaDescriptionValue, contentValue, wordCount]);

    const onSubmit = async (data) => {
        if (!filePreview && !isEditPage) {
            toast.error("Featured image is required");
            return;
        }

        setIsSaving(true);
        try {
            let imageUrl = filePreview;
            let cloudinaryPublicId = null;

            if (selectedFile) {
                const uploadRes = await uploadToCloudinary(selectedFile, { preset: 'blog', folder: 'blog_featured' });
                imageUrl = uploadRes.url;
                cloudinaryPublicId = uploadRes.publicId;
            }

            const payload = {
                ...data,
                category: data.category.value,
                status: data.status.value,
                image: imageUrl,
                cloudinaryPublicId: cloudinaryPublicId || (isEditPage ? items.find(i => i.id === id)?.cloudinaryPublicId : null),
                wordCount,
                readTime,
                updatedAt: new Date()
            };

            await saveBlog(isEditPage ? id : null, payload);
            toast.success(isEditPage ? "Post updated!" : "Post published!");
            navigate('/admin/blog');
        } catch (err) {
            console.error(err);
            toast.error("Failed to save post");
        } finally {
            setIsSaving(false);
        }
    };

    const handleQuickStatusChange = async (item, newStatus) => {
        try {
            await saveBlog(item.id, { ...item, status: newStatus });
            toast.success(`Post ${newStatus.toLowerCase()}`);
        } catch (err) {
            toast.error("Update failed");
        }
    };

    const confirmDeleteAction = async () => {
        if (confirmDelete.id) {
            try {
                await deleteBlog(confirmDelete.id);
                toast.success("Post deleted");
            } catch (err) {
                toast.error("Delete failed");
            }
            setConfirmDelete({ isOpen: false, id: null });
        }
    };

    // Table Columns
    const columns = [
        {
            key: 'image',
            label: 'Post',
            render: (item) => (
                <div className="flex items-center gap-4">
                    <div className="w-16 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-bold text-gray-900 truncate max-w-[250px]">{item.title}</span>
                        <span className="text-[11px] text-gray-500 font-medium tracking-wide uppercase">{item.category}</span>
                    </div>
                </div>
            )
        },
        {
            key: 'status',
            label: 'Status',
            render: (item) => {
                const status = item.status || 'Draft';
                const styles = {
                    Published: 'bg-emerald-50 text-emerald-600 border-emerald-100',
                    Draft: 'bg-amber-50 text-amber-600 border-amber-100',
                    Archived: 'bg-gray-100 text-gray-600 border-gray-200'
                };
                return (
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${styles[status] || styles.Draft}`}>
                        {status}
                    </span>
                );
            }
        },
        {
            key: 'stats',
            label: 'Read Time',
            render: (item) => (
                <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock size={14} />
                    <span className="text-xs font-medium">{item.readTime || 1} min</span>
                </div>
            )
        },
        {
            key: 'publishDate',
            label: 'Date',
            render: (item) => (
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-700">{formatDate(item.publishDate)}</span>
                    <span className="text-[10px] text-gray-400">Created At</span>
                </div>
            )
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (item) => (
                <div className="flex gap-2">
                    <button 
                        onClick={() => navigate(`/admin/blog/edit/${item.id}`)}
                        className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button 
                        onClick={() => setConfirmDelete({ isOpen: true, id: item.id })}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )
        }
    ];

    if (isAddPage || isEditPage) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[1400px] mx-auto pb-20"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/admin/blog')}
                            className="p-2.5 rounded-2xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{isEditPage ? 'Update Article' : 'Draft New Article'}</h1>
                            <p className="text-sm text-gray-500 font-medium">Capture your stories and share them with the world.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => navigate('/admin/blog')}
                            className="px-6 py-2.5 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all"
                        >
                            Discard
                        </button>
                        <button 
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSaving}
                            className="px-8 py-2.5 text-sm font-bold text-white bg-primary rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                        >
                            {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles size={16} />}
                            {isEditPage ? 'Update Post' : 'Publish Post'}
                        </button>
                    </div>
                </div>

                <form className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Title Section */}
                        <div className="bg-white rounded-[2rem] p-10 border border-gray-200/60 shadow-sm">
                            <input 
                                {...register('title', { required: true })}
                                type="text"
                                placeholder="Article Title..."
                                className="w-full text-5xl font-bold text-gray-900 placeholder:text-gray-200 border-0 p-0 focus:ring-0 mb-6 bg-transparent"
                            />
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl text-gray-500 border border-gray-100">
                                    <Tag size={14} />
                                    <span className="text-xs font-bold uppercase tracking-wider">{watch('category')?.label || 'Uncategorized'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Clock size={14} />
                                    <span className="text-xs font-medium">{readTime} min read</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <FileText size={14} />
                                    <span className="text-xs font-medium">{wordCount} words</span>
                                </div>
                            </div>
                        </div>

                        {/* Editor Section */}
                        <div className="bg-white rounded-[2rem] p-10 border border-gray-200/60 shadow-sm min-h-[600px]">
                            <Controller
                                name="content"
                                control={control}
                                render={({ field }) => (
                                    <SlashEditor 
                                        value={field.value}
                                        onChange={field.onChange}
                                        onImageUpload={async (file) => {
                                            const res = await uploadToCloudinary(file, { preset: 'blog', folder: 'blog_content' });
                                            return res.url;
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Sidebar / Settings */}
                    <div className="space-y-6">
                        {/* Publishing Card */}
                        <div className="bg-white rounded-[2rem] p-8 border border-gray-200/60 shadow-sm space-y-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-4">Publishing</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Featured Image</label>
                                    <ImageUploadField 
                                        value={filePreview}
                                        onChange={setFilePreview}
                                        onFileChange={setSelectedFile}
                                        aspectRatio={16/9}
                                        className="rounded-2xl border-dashed border-2 border-gray-100 hover:border-primary/20 transition-all bg-gray-50/50"
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Category</label>
                                    <Controller
                                        name="category"
                                        control={control}
                                        render={({ field }) => (
                                            <Select 
                                                {...field}
                                                options={BLOG_CATEGORIES}
                                                className="text-sm"
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        borderRadius: '1rem',
                                                        padding: '4px',
                                                        borderColor: '#f3f4f6',
                                                        '&:hover': { borderColor: '#800000' }
                                                    })
                                                }}
                                            />
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Status</label>
                                    <Controller
                                        name="status"
                                        control={control}
                                        render={({ field }) => (
                                            <Select 
                                                {...field}
                                                options={BLOG_STATUS_OPTIONS}
                                                className="text-sm"
                                                styles={{
                                                    control: (base) => ({
                                                        ...base,
                                                        borderRadius: '1rem',
                                                        padding: '4px',
                                                        borderColor: '#f3f4f6',
                                                        '&:hover': { borderColor: '#800000' }
                                                    })
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SEO Card */}
                        <div className="bg-white rounded-[2rem] p-8 border border-gray-200/60 shadow-sm space-y-6">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">SEO Score</h3>
                                <div className={`text-xs font-bold px-2 py-0.5 rounded-lg ${seoScore > 70 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                    {seoScore}%
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Focus Keyword</label>
                                    <input 
                                        {...register('focusKeyword')}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="e.g. Navaratri 2024"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Meta Description</label>
                                    <textarea 
                                        {...register('metaDescription')}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                        rows={3}
                                        placeholder="Briefly describe the article..."
                                    />
                                    <div className="flex justify-end mt-1">
                                        <span className="text-[10px] text-gray-400 font-bold">{metaDescriptionValue?.length || 0}/160</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </motion.div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] border border-gray-200/60 shadow-sm">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
                    <p className="text-gray-500 font-medium text-sm mt-1">Manage your stories, drafts, and scheduled posts.</p>
                </div>
                <button 
                    onClick={() => navigate('/admin/blog/add')}
                    className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                    <Plus size={20} />
                    Create New Post
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Published Posts', val: items.filter(i => i.status === 'Published').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Drafts', val: items.filter(i => i.status === 'Draft' || !i.status).length, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Total Read Time', val: `${items.reduce((acc, i) => acc + (i.readTime || 0), 0)} min`, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-200/60 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            <DataTable 
                data={items}
                columns={columns}
                searchPlaceholder="Search blogs..."
                loading={loading}
                filterOptions={[
                    { key: 'status', label: 'Status', options: BLOG_STATUS_OPTIONS },
                    { key: 'category', label: 'Category', options: BLOG_CATEGORIES }
                ]}
            />

            <ConfirmDialog 
                isOpen={confirmDelete.isOpen}
                onClose={() => setConfirmDelete({ isOpen: false, id: null })}
                onConfirm={confirmDeleteAction}
                title="Delete Article?"
                message="This action cannot be undone. All images and content associated with this post will be permanently removed."
            />
        </div>
    );
};

export default Blog;
