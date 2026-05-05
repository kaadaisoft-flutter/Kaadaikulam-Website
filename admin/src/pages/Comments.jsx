import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import { CheckCircle, XCircle, Trash2, MessageSquare, Eye } from 'lucide-react';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import { formatDate, formatDateTime } from '../utils/dateUtils';
import { COMMENT_STATUS_OPTIONS } from '../constants';
import { subscribeComments, updateCommentStatus, deleteComment } from '../services/commentService';
import ConfirmDialog from '../components/ConfirmDialog';

const Comments = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, id: null });
    const [selectedComment, setSelectedComment] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribeComments((data) => {
            setItems(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateCommentStatus(id, newStatus);
            toast.success(`Comment ${newStatus}`, { id: 'comments-status' });
            setIsViewModalOpen(false);
            setSelectedComment(null);
        } catch (error) {
            console.error('Error updating comment status:', error);
            toast.error('Failed to update status');
        }
    };

    const viewComment = (comment) => {
        setSelectedComment(comment);
        setIsViewModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            await deleteComment(confirmDelete.id);
            toast.success('Comment deleted successfully');
            setConfirmDelete({ isOpen: false, id: null });
        } catch (error) {
            console.error('Error deleting comment:', error);
            toast.error('Failed to delete comment');
        }
    };

    const columns = [
        {
            key: 'name', label: 'Author Info', sortable: true, render: (item) => (
                <div className="flex flex-col min-w-[150px]">
                    <div className="font-bold text-gray-900 text-sm">{item.name}</div>
                    <div className="text-[11px] text-gray-500 font-medium">{item.email}</div>
                </div>
            )
        },
        {
            key: 'postSlug', label: 'Article Slug', sortable: true, render: (item) => (
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100 max-w-[200px] truncate">
                    <MessageSquare size={12} className="text-primary/60 shrink-0" />
                    {item.postSlug}
                </div>
            )
        },
        {
            key: 'comment', label: 'Comment', sortable: false, render: (item) => (
                <div className="max-w-md text-sm text-gray-700 leading-relaxed py-1 line-clamp-1" title={item.comment}>
                    {item.comment}
                </div>
            )
        },
        {
            key: 'createdAt', label: 'Date & Time', sortable: true,
            render: (item) => (
                <div className="text-xs text-gray-500 whitespace-nowrap font-medium">
                    {formatDateTime(item.createdAt)}
                </div>
            )
        },
        {
            key: 'status', label: 'Status', sortable: true, render: (item) => {
                const colors = {
                    'approved': 'bg-green-50 text-green-700 border-green-100',
                    'pending': 'bg-amber-50 text-amber-700 border-amber-100',
                    'rejected': 'bg-red-50 text-red-700 border-red-100'
                };
                const labels = { 'approved': 'Approved', 'pending': 'Pending', 'rejected': 'Rejected' };
                return (
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[item.status] || 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                        {labels[item.status] || item.status}
                    </span>
                );
            }
        },
        {
            key: 'actions', label: 'Actions', sortable: false, render: (item) => (
                <div className="flex items-center gap-1">
                    <button onClick={() => viewComment(item)} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors" title="View Details">
                        <Eye size={18} />
                    </button>
                    {item.status !== 'approved' && (
                        <button onClick={() => handleStatusUpdate(item.id, 'approved')} className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 hover:text-green-700 transition-colors" title="Approve">
                            <CheckCircle size={18} />
                        </button>
                    )}
                    {item.status !== 'rejected' && (
                        <button onClick={() => handleStatusUpdate(item.id, 'rejected')} className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 hover:text-amber-700 transition-colors" title="Reject">
                            <XCircle size={18} />
                        </button>
                    )}
                    <button
                        onClick={() => setConfirmDelete({ isOpen: true, id: item.id })}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ),
        }
    ];

    const filterOptions = [
        { key: 'status', label: 'Status', options: COMMENT_STATUS_OPTIONS },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900">Blog Comments</h2>
                    <p className="text-gray-500 mt-1 max-w-2xl text-sm">Review, approve, or reject comments submitted by devotees on your temple blog posts.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <DataTable
                    data={items}
                    columns={columns}
                    loading={loading}
                    searchPlaceholder="Search comments, author, email, or article..."
                    filterOptions={filterOptions}
                    showExport={false}
                    initialFilters={{ status: 'pending' }}
                />
            </div>

            <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Comment Details">
                {selectedComment && (
                    <div className="space-y-6">
                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-base">{selectedComment.name}</h4>
                                    <p className="text-xs text-gray-500">{selectedComment.email}</p>
                                </div>
                                <span className="text-[11px] text-gray-400 font-medium">{formatDateTime(selectedComment.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-md border border-primary/10 self-start inline-flex">
                                <MessageSquare size={12} />
                                {selectedComment.postSlug}
                            </div>
                        </div>

                        <div className="p-5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 leading-relaxed shadow-sm min-h-[120px]">
                            {selectedComment.comment}
                        </div>

                        <div className="flex flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                            {/* Left: Close Button */}
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="px-6 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all whitespace-nowrap"
                            >
                                Close
                            </button>

                            {/* Center & Right: Action Buttons */}
                            <div className="flex items-center gap-3">
                                {selectedComment.status !== 'rejected' && (
                                    <button
                                        onClick={() => handleStatusUpdate(selectedComment.id, 'rejected')}
                                        className="flex items-center gap-2 px-6 py-2 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-all group whitespace-nowrap"
                                    >
                                        <XCircle size={16} className="group-hover:rotate-90 transition-transform" />
                                        <span>Reject</span>
                                    </button>
                                )}

                                {selectedComment.status !== 'approved' && (
                                    <button
                                        onClick={() => handleStatusUpdate(selectedComment.id, 'approved')}
                                        className="flex items-center gap-2 px-8 py-2 text-xs font-bold text-white bg-primary rounded-xl hover:bg-primary-dark shadow-md shadow-primary/20 transition-all group whitespace-nowrap"
                                    >
                                        <CheckCircle size={16} className="group-hover:scale-110 transition-transform" />
                                        <span>Approve</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <ConfirmDialog
                isOpen={confirmDelete.isOpen}
                onClose={() => setConfirmDelete({ isOpen: false, id: null })}
                onConfirm={handleDelete}
                title="Delete Comment"
                message="Are you sure you want to permanently delete this comment? This action cannot be undone."
                variant="danger"
            />
        </div>
    );
};

export default Comments;
