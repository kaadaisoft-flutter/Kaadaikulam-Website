import React, { useState, useCallback, useEffect, useRef } from 'react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { Plus, Trash2, X, Upload, Video } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { formatDateTime } from '../utils/dateUtils';
import MediaPreview from '../components/MediaPreview';
import ImageUploadField from '../components/ImageUploadField';
import { GALLERY_CATEGORIES, GALLERY_MEDIA_TYPES, PLACEHOLDER_IMG, PLACEHOLDER_VID } from '../constants';
import { extractYoutubeId } from '../utils/youtubeUtils';
import { subscribeGallery, uploadGalleryMedia, addGalleryItem, deleteGalleryItem } from '../services/galleryService';

const categoryOptions = GALLERY_CATEGORIES;
const mediaTypeOptions = GALLERY_MEDIA_TYPES;

const Gallery = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewSelection, setPreviewSelection] = useState({ isOpen: false, media: null });
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeGallery((data) => {
            setItems(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // File preview state
    const [filePreview, setFilePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isConverting, setIsConverting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, item: null });
    const prevMediaTypeRef = useRef(null);

    const { control, handleSubmit, reset, watch, register, formState: { errors } } = useForm({
        defaultValues: {
            category: null,
            mediaType: mediaTypeOptions[0],
            youtubeUrl: '',
            title: '',
        }
    });

    const selectedMediaType = watch('mediaType');

    const openPreview = (item) => {
        setPreviewSelection({ isOpen: true, media: item });
    };

    const columns = [
        {
            key: 'thumbnail',
            label: 'Media',
            sortable: false,
            render: (item) => (
                <div
                    className="w-12 h-12 rounded-lg overflow-hidden bg-black flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all group"
                    onClick={() => openPreview(item)}
                >
                    {item.type === 'YouTube Video' ? (
                        <div className="relative w-full h-full">
                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <Video size={18} className="text-red-500 fill-red-500" />
                            </div>
                        </div>
                    ) : item.type === 'Video Upload' ? (
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
                    ) : (
                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    )}
                </div>
            )
        },
        {
            key: 'title',
            label: 'Media Title',
            sortable: true,
            render: (item) => (
                <div>
                    <div className="font-medium text-gray-900 truncate max-w-[250px]">{item.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{item.category}</div>
                </div>
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
                <button
                    onClick={() => handleDelete(item)}
                    className="p-1.5 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete"
                >
                    <Trash2 size={16} />
                </button>
            ),
        }
    ];

    const filterOptions = [
        {
            key: 'category',
            label: 'Category',
            options: categoryOptions
        },
        {
            key: 'type',
            label: 'Media Type',
            options: mediaTypeOptions
        }
    ];

    const handleDelete = (item) => setConfirmDelete({ isOpen: true, item });
    const confirmDeleteAction = async () => {
        if (confirmDelete.item) {
            try {
                await deleteGalleryItem(confirmDelete.item.id, confirmDelete.item);
                setItems(items.filter((i) => i.id !== confirmDelete.item.id));
                toast.success('Media deleted successfully', { id: 'gallery-delete' });
            } catch (err) {
                console.error('Delete failed:', err);
                toast.error('Failed to delete media', { id: 'gallery-delete-error' });
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

    useEffect(() => {
        const current = selectedMediaType?.value;
        if (prevMediaTypeRef.current != null && prevMediaTypeRef.current !== current && current !== 'YouTube Video') {
            clearFile();
        }
        prevMediaTypeRef.current = current;
    }, [selectedMediaType?.value, clearFile]);

    const onSubmit = async (data) => {
        const isYoutube = data.mediaType.value === 'YouTube Video';
        const title = data.title || (isYoutube ? 'YouTube Video' : selectedFile?.name || 'Untitled');
        const category = data.category?.value || 'Uncategorized';
        const type = data.mediaType.value;

        setIsSubmitting(true);
        try {
            if (isYoutube) {
                const videoId = extractYoutubeId(data.youtubeUrl);
                const item = {
                    title,
                    category,
                    type,
                    thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : PLACEHOLDER_VID,
                    fullUrl: data.youtubeUrl,
                };
                await addGalleryItem(item);
            } else {
                if (!selectedFile) {
                    toast.error('Please select an image or video file', { id: 'gallery-no-file' });
                    setIsSubmitting(false);
                    return;
                }
                if (selectedFile.type.startsWith('video/') && selectedFile.size > MAX_VIDEO_SIZE_BYTES) {
                    toast.error(`Video size must be under ${MAX_VIDEO_SIZE_MB}MB`, { id: 'gallery-video-size' });
                    setIsSubmitting(false);
                    return;
                }
                await uploadGalleryMedia(selectedFile, { title, category, type });
            }
            closeModal();
            toast.success('Media uploaded successfully', { id: 'gallery-upload' });
        } catch (err) {
            console.error('Upload failed:', err);
            toast.error('Failed to upload media', { id: 'gallery-upload-error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        clearFile();
        reset();
    };

    // react-select custom styles
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
            {/* Page header with action button on the right */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Gallery Management</h2>
                    <p className="text-gray-600 mt-1">Manage and export temple photos and videos.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors shrink-0"
                >
                    <Plus size={16} />
                    <span>Upload Media</span>
                </button>
            </div>

            {loading ? (
                <p className="text-sm text-gray-500 text-center py-8">Loading gallery...</p>
            ) : (
                <DataTable
                    data={items}
                    columns={columns}
                    searchPlaceholder="Search media..."
                    filterOptions={filterOptions}
                    showExport={false}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Upload New Media"
                maxWidth="max-w-lg"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Title input - Moved to 1st row */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                        <input
                            {...register('title', { required: 'Media title is required' })}
                            type="text"
                            placeholder="e.g. Temple Festival 2026"
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Media Type select */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Media Type <span className="text-red-500">*</span></label>
                            <Controller
                                name="mediaType"
                                control={control}
                                rules={{ required: 'Please select a type' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={mediaTypeOptions}
                                        styles={selectStyles}
                                        placeholder="Select type..."
                                    />
                                )}
                            />
                        </div>

                        {/* Category select */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: 'Please select a category' }}
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
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                        </div>
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
                    ) : selectedMediaType?.value === 'Image' ? (
                        <ImageUploadField
                            value={filePreview}
                            onChange={setFilePreview}
                            onFileChange={setSelectedFile}
                            label="Upload Image"
                            required
                            placeholder="Click to upload or drag & drop"
                            previewClassName="w-20 h-20"
                            onPreviewClick={(url) => url && openPreview({ type: 'Photo', fullUrl: url, title: selectedFile?.name || 'Image' })}
                            onConvertingChange={setIsConverting}
                            aspectRatio={4 / 3}
                        />
                    ) : (
                        /* Video upload area */
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload Video <span className="text-red-500">*</span>
                            </label>
                            {!filePreview ? (
                                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 hover:border-primary/30 transition-all cursor-pointer">
                                    <Upload size={28} className="text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-600 font-medium">Click to upload or drag & drop</p>
                                    <p className="text-xs text-gray-500 mt-1">Max {MAX_VIDEO_SIZE_MB}MB</p>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className="hidden"
                                        onChange={handleVideoFileChange}
                                    />
                                </label>
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
                                            <p className="text-sm font-medium text-gray-800 truncate">{selectedFile?.name}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {selectedFile?.type} · {(selectedFile?.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => document.getElementById('gallery-file-input')?.click()}
                                                className="px-2 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                            >
                                                Change
                                            </button>
                                            <button
                                                type="button"
                                                onClick={clearFile}
                                                className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <input
                                        id="gallery-file-input"
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
                            disabled={isConverting || isSubmitting}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isConverting ? 'Processing...' : isSubmitting ? 'Uploading...' : 'Upload'}
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
                onClose={() => setConfirmDelete({ isOpen: false, id: null })}
                onConfirm={confirmDeleteAction}
                title="Delete Media"
                message="Are you sure you want to delete this item? This action cannot be undone."
                confirmLabel="Delete"
                variant="danger"
            />
        </div>
    );
};

export default Gallery;
