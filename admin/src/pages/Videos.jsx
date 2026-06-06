import React, { useState, useCallback, useEffect, useRef } from 'react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Plus, Trash2, Pencil, X, Upload, Video } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { formatDateTime } from '../utils/dateUtils';
import MediaPreview from '../components/MediaPreview';
import { GALLERY_CATEGORIES, PLACEHOLDER_VID } from '../constants';
import { extractYoutubeId } from '../utils/youtubeUtils';
import { subscribeGallery, saveGalleryItem, deleteGalleryItem } from '../services/galleryService';
import { getTemples } from '../services/templeService';
import { auth } from '../firebase';
import ImageUploadField from '../components/ImageUploadField';

const categoryOptions = GALLERY_CATEGORIES;

const videoMediaTypeOptions = [
    { value: 'YouTube Video', label: 'YouTube Video' },
    { value: 'Video Upload', label: 'Video Upload' },
];

const defaultValues = {
    title: '',
    category: null,
    mediaType: videoMediaTypeOptions[0], // Defaults to YouTube Video
    templeName: null,
    description: '',
    featured: false,
    published: true,
    youtubeUrl: '',
};

const Videos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [previewSelection, setPreviewSelection] = useState({ isOpen: false, media: null });
    const [items, setItems] = useState([]);
    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all gallery items and filter for videos on display
    useEffect(() => {
        const unsubscribe = subscribeGallery((data) => {
            const videoItems = data.filter(i => i.type === 'YouTube Video' || i.type === 'Video Upload');
            setItems(videoItems);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Fetch temples for dropdown selection
    useEffect(() => {
        const fetchTemples = async () => {
            try {
                const data = await getTemples();
                setTemples(data);
            } catch (err) {
                console.error('Failed to fetch temples:', err);
                toast.error('Failed to load temples dropdown data');
            }
        };
        fetchTemples();
    }, []);

    const templeOptions = temples.map(t => ({
        value: t.id,
        label: t.name
    }));

    // Video preview and file state
    const [filePreview, setFilePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [isVideoDragActive, setIsVideoDragActive] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, item: null });
    const prevMediaTypeRef = useRef(null);

    const { control, handleSubmit, reset, watch, register, formState: { errors } } = useForm({
        defaultValues
    });

    const selectedMediaType = watch('mediaType');
    const selectedCategory = watch('category');

    const openPreview = (item) => {
        setPreviewSelection({
            isOpen: true,
            media: {
                type: item.type === 'YouTube Video' ? 'YouTube' : 'Video',
                fullUrl: item.fullUrl,
                title: item.title,
            }
        });
    };

    const openAdd = () => {
        setEditingItem(null);
        setFilePreview(null);
        setSelectedFile(null);
        setThumbnailPreview(null);
        setThumbnailFile(null);
        reset(defaultValues);
        setIsModalOpen(true);
    };

    const openEdit = (item) => {
        setEditingItem(item);
        setFilePreview(item.thumbnail || item.imageUrl || null);
        setSelectedFile(null);
        
        // Detect if the thumbnail is a default YouTube / placeholder or a custom upload
        const isPlaceholder = item.thumbnail === PLACEHOLDER_VID || (item.type === 'YouTube Video' && item.thumbnail && item.thumbnail.includes('img.youtube.com'));
        setThumbnailPreview(!isPlaceholder ? item.thumbnail : null);
        setThumbnailFile(null);

        reset({
            title: item.title || '',
            category: categoryOptions.find(o => o.value === item.category) || null,
            mediaType: videoMediaTypeOptions.find(o => o.value === item.type) || videoMediaTypeOptions[0],
            templeName: templeOptions.find(o => o.value === item.templeName) || null,
            description: item.description || '',
            featured: !!item.featured,
            published: item.published !== false,
            youtubeUrl: item.type === 'YouTube Video' ? item.fullUrl : '',
        });
        setIsModalOpen(true);
    };

    const columns = [
        {
            key: 'thumbnail',
            label: 'Video Thumbnail',
            sortable: false,
            render: (item) => (
                <div
                    className="w-16 h-10 rounded overflow-hidden bg-black flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all group"
                    onClick={() => openPreview(item)}
                >
                    {item.type === 'YouTube Video' ? (
                        <div className="relative w-full h-full">
                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <Video size={18} className="text-red-500 fill-red-500" />
                            </div>
                        </div>
                    ) : (
                        <div className="relative w-full h-full">
                            <video
                                src={item.thumbnail}
                                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                                muted
                                preload="metadata"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                                <Video size={18} className="text-white drop-shadow-lg" />
                            </div>
                        </div>
                    )}
                </div>
            )
        },
        {
            key: 'title',
            label: 'Video Details',
            sortable: true,
            render: (item) => (
                <div>
                    <div className="font-semibold text-gray-900 truncate max-w-[220px]" title={item.title}>{item.title}</div>
                    <div className="text-xs text-gray-400 mt-1 flex flex-wrap gap-x-2 gap-y-0.5 items-center">
                        <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[10px] font-medium">{item.type}</span>
                        <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[10px] font-medium">{item.category}</span>
                        {item.templeName && (
                            <span className="bg-primary/5 text-primary px-1.5 py-0.5 rounded text-[10px] font-medium border border-primary/10">
                                {temples.find(t => t.id === item.templeName)?.name || item.templeName}
                            </span>
                        )}
                    </div>
                </div>
            )
        },
        {
            key: 'published',
            label: 'Status',
            sortable: true,
            render: (item) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.published !== false ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                    {item.published !== false ? 'Published' : 'Draft'}
                </span>
            )
        },
        {
            key: 'date',
            label: 'Upload Date & Time',
            sortable: true,
            render: (item) => (
                <span className="text-sm text-gray-600">{formatDateTime(item.date)}</span>
            )
        },
        {
            key: 'actions',
            label: 'Actions',
            sortable: false,
            render: (item) => (
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50 transition-colors"
                        title="Edit"
                    >
                        <Pencil size={15} />
                    </button>
                    <button
                        onClick={() => handleDelete(item)}
                        className="p-1.5 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={15} />
                    </button>
                </div>
            ),
        }
    ];

    const filterOptions = [
        {
            key: 'type',
            label: 'Video Type',
            options: videoMediaTypeOptions
        },
        {
            key: 'category',
            label: 'Category',
            options: categoryOptions
        },
        {
            key: 'templeName',
            label: 'Temple',
            options: templeOptions
        }
    ];

    const handleDelete = (item) => setConfirmDelete({ isOpen: true, item });
    
    const confirmDeleteAction = async () => {
        if (confirmDelete.item) {
            try {
                await deleteGalleryItem(confirmDelete.item.id, confirmDelete.item);
                setItems(items.filter((i) => i.id !== confirmDelete.item.id));
                toast.success('Video deleted successfully', { id: 'gallery-delete' });
            } catch (err) {
                console.error('Delete failed:', err);
                toast.error('Failed to delete video', { id: 'gallery-delete-error' });
            }
            setConfirmDelete({ isOpen: false, item: null });
        }
    };

    const MAX_VIDEO_SIZE_MB = 20;
    const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

    const handleVideoFileChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith('video/')) return;
        if (file.size > MAX_VIDEO_SIZE_BYTES) {
            toast.error(`Video size must be under ${MAX_VIDEO_SIZE_MB}MB`, { id: 'gallery-video-size' });
            e.target.value = '';
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setFilePreview(objectUrl);
        setSelectedFile(file);
    }, []);

    const clearFile = useCallback(() => {
        if (filePreview && filePreview.startsWith('blob:')) {
            URL.revokeObjectURL(filePreview);
        }
        setFilePreview(null);
        setSelectedFile(null);
    }, [filePreview]);

    const handleVideoDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsVideoDragActive(true);
        } else if (e.type === "dragleave") {
            setIsVideoDragActive(false);
        }
    }, []);

    const handleVideoDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsVideoDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('video/')) {
                if (file.size > MAX_VIDEO_SIZE_BYTES) {
                    toast.error(`Video size must be under ${MAX_VIDEO_SIZE_MB}MB`, { id: 'gallery-video-size' });
                    return;
                }
                const objectUrl = URL.createObjectURL(file);
                setFilePreview(objectUrl);
                setSelectedFile(file);
            } else {
                toast.error("Please drop a video file only", { id: 'gallery-video-drop-error' });
            }
        }
    }, [MAX_VIDEO_SIZE_BYTES]);

    useEffect(() => {
        const current = selectedMediaType?.value;
        if (prevMediaTypeRef.current != null && prevMediaTypeRef.current !== current) {
            clearFile();
        }
        prevMediaTypeRef.current = current;
    }, [selectedMediaType?.value, clearFile]);

    const onSubmit = async (data) => {
        const isYoutube = data.mediaType.value === 'YouTube Video';
        const category = data.category?.value || 'Others';
        const type = data.mediaType.value;
        const templeName = data.templeName?.value || '';
        const description = data.description || '';
        const featured = !!data.featured;
        const published = !!data.published;

        setIsSubmitting(true);
        try {
            const uploadedBy = auth.currentUser?.email || 'admin@kaadai.com';

            const payload = {
                category,
                type,
                templeName,
                description,
                featured,
                published,
                uploadedBy,
            };

            if (isYoutube) {
                const videoId = extractYoutubeId(data.youtubeUrl);
                payload.title = data.title || 'YouTube Video';
                payload.fullUrl = data.youtubeUrl;
                
                if (!thumbnailFile) {
                    if (editingItem) {
                        payload.thumbnail = editingItem.thumbnail || `https://img.youtube.com/vi/${videoId}/0.jpg`;
                        payload.imageUrl = editingItem.imageUrl || payload.thumbnail;
                        payload.cloudinaryThumbnailPublicId = editingItem.cloudinaryThumbnailPublicId || '';
                    } else {
                        payload.thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : PLACEHOLDER_VID;
                        payload.imageUrl = payload.thumbnail;
                    }
                }

                await saveGalleryItem(editingItem?.id || null, payload, null, thumbnailFile);
            } else {
                // Video Upload
                if (!editingItem && !selectedFile) {
                    toast.error('Please select a video file', { id: 'gallery-no-file' });
                    setIsSubmitting(false);
                    return;
                }

                payload.title = data.title || selectedFile?.name.replace(/\.[^/.]+$/, '') || 'Untitled Video';

                if (editingItem) {
                    payload.thumbnail = editingItem.thumbnail || '';
                    payload.fullUrl = editingItem.fullUrl || '';
                    payload.imageUrl = editingItem.imageUrl || '';
                    payload.cloudinaryPublicId = editingItem.cloudinaryPublicId || '';
                    payload.cloudinaryResourceType = editingItem.cloudinaryResourceType || '';
                    payload.cloudinaryThumbnailPublicId = editingItem.cloudinaryThumbnailPublicId || '';
                }

                await saveGalleryItem(editingItem?.id || null, payload, selectedFile, thumbnailFile);
            }
            closeModal();
            toast.success(editingItem ? 'Video updated successfully' : 'Video uploaded successfully', { id: 'gallery-upload' });
        } catch (err) {
            console.error('Upload failed:', err);
            toast.error('Failed to save video', { id: 'gallery-upload-error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        clearFile();
        setThumbnailPreview(null);
        setThumbnailFile(null);
        reset(defaultValues);
    };

    const selectStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? '#800000' : '#d1d5db',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(128, 0, 0, 0.2)' : base.boxShadow,
            '&:hover': { borderColor: '#800000' },
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            minHeight: '38px',
            cursor: 'pointer',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#800000' : state.isFocused ? 'rgba(128, 0, 0, 0.05)' : 'white',
            color: state.isSelected ? 'white' : '#374151',
            fontSize: '0.875rem',
            cursor: 'pointer',
        }),
    };

    const isYoutubeSelected = selectedMediaType?.value === 'YouTube Video';

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Video Management</h2>
                    <p className="text-gray-600 mt-1">Manage and publish temple video content.</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors shrink-0"
                >
                    <Plus size={16} />
                    <span>Upload Video</span>
                </button>
            </div>

            {loading ? (
                <p className="text-sm text-gray-500 text-center py-8">Loading videos...</p>
            ) : (
                <DataTable
                    data={items}
                    columns={columns}
                    searchPlaceholder="Search videos..."
                    filterOptions={filterOptions}
                    showExport={false}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingItem ? 'Edit Video Details' : 'Upload New Video'}
                maxWidth="max-w-xl"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Media Type Dropdown Selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Video Source Type <span className="text-red-500">*</span></label>
                        <Controller
                            name="mediaType"
                            control={control}
                            rules={{ required: 'Please select a video type' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={videoMediaTypeOptions}
                                    styles={selectStyles}
                                    placeholder="Select video source..."
                                    isClearable={false}
                                />
                            )}
                        />
                    </div>

                    {/* Title input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title {isYoutubeSelected && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            {...register('title', { required: isYoutubeSelected ? 'Video title is required' : false })}
                            type="text"
                            placeholder={isYoutubeSelected ? "e.g. Temple Festival 2026" : "e.g. Temple Festival 2026 (Optional - defaults to filename)"}
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>

                    {/* Description input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            {...register('description')}
                            rows={3}
                            placeholder="Provide brief details or context about the video"
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary resize-none"
                        />
                    </div>

                    {/* Custom Video Cover/Thumbnail Upload */}
                    <div>
                        <ImageUploadField
                            value={thumbnailPreview}
                            onChange={setThumbnailPreview}
                            onFileChange={setThumbnailFile}
                            label="Custom Video Cover/Thumbnail Image (Optional)"
                            required={false}
                            placeholder="Click to upload custom thumbnail or drag & drop"
                            previewClassName="w-32 h-20"
                            onPreviewClick={(url) => url && openPreview({ type: 'Photo', fullUrl: url, title: 'Thumbnail Preview' })}
                            disableCrop={true}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Category select */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-gray-400">(Optional)</span></label>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={categoryOptions}
                                        styles={selectStyles}
                                        placeholder="Select category..."
                                        isClearable
                                    />
                                )}
                            />
                        </div>

                        {/* Temple Select Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Temple {selectedCategory?.value === 'Gods' || selectedCategory?.value === 'Temple' ? (
                                    <span className="text-red-500">*</span>
                                ) : (
                                    <span className="text-gray-400">(Optional)</span>
                                )}
                            </label>
                            <Controller
                                name="templeName"
                                control={control}
                                rules={{
                                    validate: (value) => {
                                        const cat = selectedCategory?.value;
                                        if ((cat === 'Gods' || cat === 'Temple') && !value) {
                                            return 'Temple selection is required for Deity or Temple categories';
                                        }
                                        return true;
                                    }
                                }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={templeOptions}
                                        styles={selectStyles}
                                        placeholder="Select temple..."
                                        isClearable
                                    />
                                )}
                            />
                            {errors.templeName && <p className="text-red-500 text-xs mt-1">{errors.templeName.message}</p>}
                        </div>
                    </div>

                    {/* Published checkbox */}
                    <div className="flex items-center gap-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                            <input
                                {...register('published')}
                                type="checkbox"
                                className="w-4 h-4 text-[#800000] border-gray-300 rounded focus:ring-[#800000] focus:ring-2 focus:ring-offset-0 cursor-pointer"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-800">Published</span>
                                <span className="text-xs text-gray-500">Make visible on website gallery & homepage</span>
                            </div>
                        </label>
                    </div>

                    {isYoutubeSelected ? (
                        /* YouTube URL input */
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL <span className="text-red-500">*</span></label>
                            <input
                                {...register('youtubeUrl', {
                                    required: isYoutubeSelected ? 'YouTube URL is required' : false,
                                    pattern: {
                                        value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
                                        message: 'Please enter a valid YouTube URL'
                                    }
                                })}
                                type="text"
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                            />
                            {errors.youtubeUrl && <p className="text-red-500 text-xs mt-1">{errors.youtubeUrl.message}</p>}
                        </div>
                    ) : (
                        /* Video upload area with drag & drop support */
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {editingItem ? "Change Video (Leave blank to keep current)" : "Upload Video"} {!editingItem && <span className="text-red-500">*</span>}
                            </label>
                            {!filePreview ? (
                                <div
                                    onDragEnter={handleVideoDrag}
                                    onDragOver={handleVideoDrag}
                                    onDragLeave={handleVideoDrag}
                                    onDrop={handleVideoDrop}
                                    className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg transition-all cursor-pointer relative ${
                                        isVideoDragActive
                                            ? 'border-primary bg-primary/5 scale-[0.99]'
                                            : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-primary/30'
                                    }`}
                                >
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleVideoFileChange}
                                    />
                                    <Upload size={28} className={`mb-2 transition-colors ${isVideoDragActive ? 'text-primary' : 'text-gray-400'}`} />
                                    <p className="text-sm text-gray-600 font-medium">Click to upload or drag & drop</p>
                                    <p className="text-xs text-gray-500 mt-1">Max {MAX_VIDEO_SIZE_MB}MB</p>
                                </div>
                            ) : (
                                <div className="relative border border-gray-200 rounded-lg p-3 bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
                                            onClick={() => openPreview({ type: 'Video Upload', fullUrl: filePreview, title: selectedFile?.name })}
                                        >
                                            <video src={filePreview} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">{selectedFile?.name || 'Current Video'}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {selectedFile ? `${selectedFile.type} · ${(selectedFile.size / 1024).toFixed(1)} KB` : 'Uploaded video'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => document.getElementById('videos-file-input')?.click()}
                                                className="px-2 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                            >
                                                Change
                                            </button>
                                            {!editingItem && (
                                                <button
                                                    type="button"
                                                    onClick={clearFile}
                                                    className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <input
                                        id="videos-file-input"
                                        type="file"
                                        accept="video/*"
                                        className="hidden"
                                        onChange={handleVideoFileChange}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    <div className="pt-2 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Saving...' : editingItem ? 'Save Changes' : 'Upload'}
                        </button>
                    </div>
                </form>
            </Modal>

            <MediaPreview
                isOpen={previewSelection.isOpen}
                onClose={() => setPreviewSelection({ isOpen: false, media: null })}
                media={previewSelection.media}
            />

            <ConfirmDialog
                isOpen={confirmDelete.isOpen}
                onClose={() => setConfirmDelete({ isOpen: false, item: null })}
                onConfirm={confirmDeleteAction}
                title="Delete Video"
                message="Are you sure you want to delete this video? This action cannot be undone."
                confirmLabel="Delete"
                variant="danger"
            />
        </div>
    );
};

export default Videos;
