import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import ImageUploadField from '../components/ImageUploadField';
import DataTable from '../components/DataTable';
import { Plus, Trash2, Pencil, CalendarDays, MapPin, Tag } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { formatDateTime } from '../utils/dateUtils';
import { subscribeEvents, saveEvent, deleteEvent } from '../services/eventService';

const STATUS_OPTIONS = [
    { value: 'Published', label: 'Published' },
    { value: 'Draft', label: 'Draft' },
];

const CATEGORY_OPTIONS = [
    { value: 'Festival', label: 'Festival' },
    { value: 'Ceremony', label: 'Ceremony' },
    { value: 'Cultural', label: 'Cultural' },
    { value: 'Spiritual', label: 'Spiritual' },
    { value: 'Community', label: 'Community' },
    { value: 'Other', label: 'Other' },
];

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

const defaultValues = {
    title: '',
    shortDescription: '',
    description: '',
    eventDate: '',
    location: '',
    category: null,
    status: STATUS_OPTIONS[0],
    image: '',
};

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, item: null });

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({ defaultValues });

    useEffect(() => {
        const unsub = subscribeEvents((data) => {
            setEvents(data);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const openAdd = () => {
        setEditingEvent(null);
        setImagePreview('');
        setImageFile(null);
        reset(defaultValues);
        setIsModalOpen(true);
    };

    const openEdit = (event) => {
        setEditingEvent(event);
        setImagePreview(event.image || '');
        setImageFile(null);
        reset({
            title: event.title || '',
            shortDescription: event.shortDescription || '',
            description: event.description || '',
            eventDate: event.eventDate
                ? (event.eventDate.toDate
                    ? event.eventDate.toDate().toISOString().slice(0, 16)
                    : new Date(event.eventDate).toISOString().slice(0, 16))
                : '',
            location: event.location || '',
            category: CATEGORY_OPTIONS.find(o => o.value === event.category) || null,
            status: STATUS_OPTIONS.find(o => o.value === event.status) || STATUS_OPTIONS[0],
            image: event.image || '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
        setImagePreview('');
        setImageFile(null);
        reset(defaultValues);
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // SECURITY: Ensure we don't accidentally save a local blob URL to Firestore
            let currentImage = editingEvent?.image || '';
            if (currentImage.startsWith('blob:')) {
                currentImage = ''; 
            }

            const payload = {
                title: data.title,
                shortDescription: data.shortDescription,
                description: data.description,
                eventDate: data.eventDate ? new Date(data.eventDate) : null,
                location: data.location,
                category: data.category?.value || 'Other',
                status: data.status?.value || 'Draft',
                image: currentImage,
            };
            await saveEvent(editingEvent?.id || null, payload, imageFile);
            toast.success(editingEvent ? 'Event updated!' : 'Event created!', { id: 'event-save' });
            closeModal();
        } catch (err) {
            console.error(err);
            toast.error('Failed to save event.', { id: 'event-save-error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = (item) => setConfirmDelete({ isOpen: true, item });
    const confirmDeleteAction = async () => {
        if (!confirmDelete.item) return;
        try {
            await deleteEvent(confirmDelete.item.id);
            toast.success('Event deleted.', { id: 'event-delete' });
        } catch {
            toast.error('Failed to delete event.', { id: 'event-delete-error' });
        }
        setConfirmDelete({ isOpen: false, item: null });
    };

    const formatEventDate = (ts) => {
        if (!ts) return '—';
        const date = ts.toDate ? ts.toDate() : new Date(ts);
        return new Intl.DateTimeFormat('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        }).format(date);
    };

    const columns = [
        {
            key: 'image',
            label: 'Image',
            sortable: false,
            render: (item) => (
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    {item.image && !item.image.startsWith('blob:')
                        ? <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = ''; // Clear source to show fallback
                                e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-300"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                            }}
                          />
                        : <div className="w-full h-full flex items-center justify-center text-gray-300"><CalendarDays size={24} /></div>
                    }
                </div>
            ),
        },
        {
            key: 'title',
            label: 'Event',
            sortable: true,
            render: (item) => (
                <div>
                    <div className="font-semibold text-gray-900 truncate max-w-[220px]">{item.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <Tag size={10} /> {item.category || '—'}
                    </div>
                </div>
            ),
        },
        {
            key: 'eventDate',
            label: 'Event Date',
            sortable: true,
            render: (item) => (
                <span className="text-sm text-gray-600 flex items-center gap-1.5">
                    <CalendarDays size={13} className="text-primary" />
                    {formatEventDate(item.eventDate)}
                </span>
            ),
        },
        {
            key: 'location',
            label: 'Location',
            sortable: false,
            render: (item) => (
                <span className="text-sm text-gray-600 flex items-center gap-1.5">
                    <MapPin size={13} className="text-primary" />
                    {item.location || '—'}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (item) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide
                    ${item.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {item.status}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Actions',
            sortable: false,
            render: (item) => (
                <div className="flex items-center gap-1">
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
        },
    ];

    const filterOptions = [
        {
            key: 'status',
            label: 'Status',
            options: STATUS_OPTIONS,
        },
        {
            key: 'category',
            label: 'Category',
            options: CATEGORY_OPTIONS,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Events Management</h2>
                    <p className="text-gray-600 mt-1">Create and manage temple events and announcements.</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-light transition-colors shrink-0"
                >
                    <Plus size={16} />
                    <span>Add Event</span>
                </button>
            </div>

            {loading ? (
                <p className="text-sm text-gray-500 text-center py-8">Loading events...</p>
            ) : (
                <DataTable
                    data={events}
                    columns={columns}
                    searchPlaceholder="Search events..."
                    filterOptions={filterOptions}
                    showExport={false}
                />
            )}

            {/* Create / Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingEvent ? 'Edit Event' : 'Add New Event'}
                maxWidth="max-w-2xl"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Event Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('title', { required: 'Title is required' })}
                            type="text"
                            placeholder="e.g. Karthigai Deepam Festival 2026"
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Short Description <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register('shortDescription', { required: 'Short description is required' })}
                            type="text"
                            placeholder="Brief teaser shown on the event card"
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                        />
                        {errors.shortDescription && <p className="text-red-500 text-xs mt-1">{errors.shortDescription.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            placeholder="Full event details, rituals, schedule..."
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Event Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Event Date & Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('eventDate', { required: 'Event date is required' })}
                                type="datetime-local"
                                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                            />
                            {errors.eventDate && <p className="text-red-500 text-xs mt-1">{errors.eventDate.message}</p>}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                {...register('location')}
                                type="text"
                                placeholder="e.g. Sri Angalamman Temple, Poondurai"
                                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-primary focus:border-primary"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: 'Category is required' }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={CATEGORY_OPTIONS}
                                        styles={selectStyles}
                                        placeholder="Select category..."
                                        isClearable
                                    />
                                )}
                            />
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={STATUS_OPTIONS}
                                        styles={selectStyles}
                                        placeholder="Select status..."
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <ImageUploadField
                        value={imagePreview}
                        onChange={setImagePreview}
                        onFileChange={setImageFile}
                        label="Event Banner Image"
                        placeholder="Click to upload event banner"
                        previewClassName="w-full h-40"
                        aspectRatio={16 / 9}
                    />

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
                            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-light disabled:opacity-50"
                        >
                            {isSubmitting ? 'Saving...' : editingEvent ? 'Update Event' : 'Create Event'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={confirmDelete.isOpen}
                onClose={() => setConfirmDelete({ isOpen: false, item: null })}
                onConfirm={confirmDeleteAction}
                title="Delete Event"
                message="Are you sure you want to delete this event? This action cannot be undone."
                confirmLabel="Delete"
                variant="danger"
            />
        </div>
    );
};

export default Events;
