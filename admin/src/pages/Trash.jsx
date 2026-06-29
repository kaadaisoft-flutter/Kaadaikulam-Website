import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';
import toast from 'react-hot-toast';
import { 
    Trash2, 
    RotateCcw, 
    FileText, 
    Image as ImageIcon, 
    Video, 
    Calendar, 
    Loader2
} from 'lucide-react';
import { formatDateTime } from '../utils/dateUtils';
import { 
    subscribeTrash, 
    restoreFromTrash, 
    permanentlyDeleteFromTrash, 
    emptyTrash 
} from '../services/trashService';

const Trash = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmAction, setConfirmAction] = useState({ 
        isOpen: false, 
        type: '', // 'delete_single' | 'empty_all'
        item: null 
    });
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribeTrash((data) => {
            setItems(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Helper to get formatted title, type, and thumbnail
    const getTrashItemDetails = (item) => {
        const data = item.data || {};
        const col = item.originalCollection;
        
        let title = 'Untitled';
        let type = 'Unknown';
        let imageUrl = '';
        let Icon = FileText;
        
        if (col === 'blogs') {
            title = data.title || 'Untitled Blog';
            type = 'Blog';
            imageUrl = data.image || '';
            Icon = FileText;
        } else if (col === 'gallery') {
            title = data.title || 'Untitled Media';
            const mediaType = data.type || 'Image';
            type = mediaType;
            imageUrl = data.thumbnail || data.imageUrl || '';
            Icon = mediaType.includes('Video') ? Video : ImageIcon;
        } else if (col === 'events') {
            title = data.title || 'Untitled Event';
            type = 'Event';
            imageUrl = data.image || '';
            Icon = Calendar;
        }
        
        return { title, type, imageUrl, Icon };
    };

    const handleRestore = async (item) => {
        try {
            await restoreFromTrash(item.id, item);
            toast.success('Item restored successfully.');
        } catch (err) {
            console.error('Failed to restore:', err);
            toast.error('Failed to restore item.');
        }
    };

    const handleConfirmAction = async () => {
        setActionLoading(true);
        try {
            if (confirmAction.type === 'delete_single' && confirmAction.item) {
                await permanentlyDeleteFromTrash(confirmAction.item.id, confirmAction.item);
                toast.success('Item permanently deleted.');
            } else if (confirmAction.type === 'empty_all') {
                await emptyTrash(items);
                toast.success('Trash emptied successfully.');
            }
        } catch (err) {
            console.error('Failed to perform action:', err);
            toast.error('Operation failed.');
        } finally {
            setActionLoading(false);
            setConfirmAction({ isOpen: false, type: '', item: null });
        }
    };

    const columns = [
        {
            key: 'item',
            label: 'Item',
            render: (item) => {
                const { title, type, imageUrl, Icon } = getTrashItemDetails(item);
                return (
                    <div className="flex items-center gap-4">
                        {imageUrl ? (
                            <img 
                                src={imageUrl} 
                                alt={title} 
                                className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                                <Icon size={20} />
                            </div>
                        )}
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-gray-900 truncate max-w-md">{title}</span>
                            <span className="text-[10px] text-gray-500 font-semibold tracking-wide uppercase">{type}</span>
                        </div>
                    </div>
                );
            }
        },
        {
            key: 'originalCollection',
            label: 'Source',
            render: (item) => (
                <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wide">
                    {item.originalCollection}
                </span>
            )
        },
        {
            key: 'deletedAt',
            label: 'Deleted At',
            render: (item) => (
                <div className="flex flex-col text-xs text-gray-600">
                    <span className="font-medium">{formatDateTime(item.deletedAt)}</span>
                </div>
            )
        },
        {
            key: 'deletedBy',
            label: 'Deleted By',
            render: (item) => (
                <span className="text-xs font-medium text-gray-600">
                    {item.deletedBy || 'admin'}
                </span>
            )
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (item) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleRestore(item)}
                        className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all"
                        title="Restore Item"
                    >
                        <RotateCcw size={16} />
                    </button>
                    <button
                        onClick={() => setConfirmAction({ isOpen: true, type: 'delete_single', item })}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all"
                        title="Delete Permanently"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-primary">Trash Bin</h1>
                    <p className="text-sm text-gray-500">
                        View deleted blogs, gallery media, videos, and events. You can restore them or permanently delete them.
                    </p>
                </div>
                {items.length > 0 && (
                    <button
                        onClick={() => setConfirmAction({ isOpen: true, type: 'empty_all', item: null })}
                        disabled={actionLoading}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-md shadow-red-600/10 active:scale-95 disabled:opacity-50"
                    >
                        {actionLoading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Trash2 size={16} />
                        )}
                        Empty Trash
                    </button>
                )}
            </div>

            <DataTable
                data={items}
                columns={columns}
                searchPlaceholder="Search trash..."
                loading={loading}
                showExport={false}
            />

            <ConfirmDialog
                isOpen={confirmAction.isOpen}
                onClose={() => setConfirmAction({ isOpen: false, type: '', item: null })}
                onConfirm={handleConfirmAction}
                title={confirmAction.type === 'empty_all' ? 'Empty Trash Bin?' : 'Delete Permanently?'}
                message={
                    confirmAction.type === 'empty_all'
                        ? 'Are you sure you want to permanently delete all items in the trash? This will also delete all associated files from Cloudinary. This action is irreversible.'
                        : 'Are you sure you want to permanently delete this item? Its media files on Cloudinary will also be deleted. This action is irreversible.'
                }
                confirmLabel={confirmAction.type === 'empty_all' ? 'Empty Trash' : 'Delete Permanently'}
                variant="danger"
            />
        </div>
    );
};

export default Trash;
