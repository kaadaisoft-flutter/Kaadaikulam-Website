import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';
import { Eye, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import { formatDateTime } from '../utils/dateUtils';
import { CONTACT_STATUS_OPTIONS, CONTACT_SUBJECT_OPTIONS } from '../constants';
import { subscribeContactMessages, updateContactStatus, deleteContactMessage } from '../services/contactService';

const SUBJECT_LABELS = Object.fromEntries(CONTACT_SUBJECT_OPTIONS.map((o) => [o.value, o.label]));
const STATUS_LABELS = { pending: 'Unread', read: 'Read' };

const Contact = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState({ isOpen: false, id: null });
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        const unsubscribe = subscribeContactMessages((data) => {
            setItems(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const viewMessage = async (msg) => {
        setSelectedMsg(msg);
        setIsModalOpen(true);
        if (msg.status === 'pending') {
            try {
                await updateContactStatus(msg.id, 'read');
            } catch (err) {
                console.error('Failed to mark as read:', err);
                toast.error('Failed to update status', { id: 'contact-status-error' });
            }
        }
    };

    const confirmDeleteAction = async () => {
        if (!confirmDelete.id) return;
        setDeletingId(confirmDelete.id);
        try {
            await deleteContactMessage(confirmDelete.id);
            toast.success('Message deleted', { id: 'contact-delete' });
            setConfirmDelete({ isOpen: false, id: null });
            if (selectedMsg?.id === confirmDelete.id) {
                setIsModalOpen(false);
                setSelectedMsg(null);
            }
        } catch (err) {
            console.error('Delete failed:', err);
            toast.error('Failed to delete message', { id: 'contact-delete-error' });
        } finally {
            setDeletingId(null);
        }
    };

    const columns = [
        {
            key: 'name', label: 'Sender', sortable: true, render: (item) => (
                <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.email}</div>
                    <div className="text-xs text-gray-400">{item.phone}</div>
                </div>
            )
        },
        {
            key: 'subject', label: 'Subject', sortable: true, render: (item) => (
                <span className={item.status === 'pending' ? 'font-bold text-gray-900' : 'text-gray-700'}>
                    {SUBJECT_LABELS[item.subject] || item.subject}
                </span>
            )
        },
        {
            key: 'date', label: 'Date', sortable: true,
            render: (item) => <span>{formatDateTime(item.createdAt || item.date)}</span>
        },
        {
            key: 'status', label: 'Status', sortable: true, render: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'pending' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                    {STATUS_LABELS[item.status] || item.status}
                </span>
            )
        },
        {
            key: 'actions', label: 'Actions', sortable: false, render: (item) => (
                <div className="flex gap-2">
                    <button onClick={() => viewMessage(item)} className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100" title="View Message"><Eye size={18} /></button>
                    <button onClick={() => setConfirmDelete({ isOpen: true, id: item.id })} disabled={deletingId === item.id} className="p-1.5 rounded-md text-red-600 hover:bg-red-50 disabled:opacity-50" title="Delete"><Trash2 size={18} /></button>
                </div>
            ),
        }
    ];

    const filterOptions = [
        { key: 'status', label: 'Status', options: CONTACT_STATUS_OPTIONS },
        { key: 'subject', label: 'Subject', options: CONTACT_SUBJECT_OPTIONS },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Contact Messages</h2>
                <p className="text-gray-600 mt-1">Review enquiries and volunteer submissions.</p>
            </div>
            <DataTable data={items} columns={columns} exportFileName="Contact_Messages_Export" searchPlaceholder="Search senders, subjects, emails..." filterOptions={filterOptions} initialFilters={{ status: 'pending' }} />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Message Details">
                {selectedMsg && (
                    <div className="space-y-4">
                        <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-gray-900">{SUBJECT_LABELS[selectedMsg.subject] || selectedMsg.subject}</h4>
                                    <p className="text-sm text-gray-600">From: {selectedMsg.name} ({selectedMsg.email})</p>
                                    <p className="text-xs text-gray-500">Phone: {selectedMsg.phone}</p>
                                </div>
                                <span className="text-xs text-gray-500">{formatDateTime(selectedMsg.createdAt || selectedMsg.date)}</span>
                            </div>
                        </div>
                        <div className="p-4 bg-white border border-gray-100 rounded-lg whitespace-pre-wrap text-sm text-gray-800">{selectedMsg.message}</div>
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
                        </div>
                    </div>
                )}
            </Modal>

            <ConfirmDialog
                isOpen={confirmDelete.isOpen}
                onClose={() => setConfirmDelete({ isOpen: false, id: null })}
                onConfirm={confirmDeleteAction}
                title="Delete Message"
                message="Are you sure you want to delete this message?"
                confirmLabel="Delete"
                variant="danger"
            />
        </div>
    );
};

export default Contact;
