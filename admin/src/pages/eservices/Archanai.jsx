import React, { useState } from 'react';
import DataTable from '../../components/DataTable';
import { CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate } from '../../utils/dateUtils';
import { APPROVAL_STATUS_OPTIONS } from '../../constants';

const Archanai = () => {
    const [items, setItems] = useState([
        { id: 'ARC-102', name: 'Sita M', service: 'Archanai (Special)', amount: '₹501', date: '2026-02-21', status: 'Approved' },
        { id: 'ARC-103', name: 'Venkat R', service: 'Sahasranama Archana', amount: '₹1001', date: '2026-02-23', status: 'Pending Approval' }
    ]);

    const handleApproval = async (id, isApproved) => {
        const newStatus = isApproved ? 'Approved' : 'Rejected';
        await new Promise(resolve => setTimeout(resolve, 800));
        if (isApproved) {
            toast.success(`Confirmation sent for Archanai Booking ID: ${id}`, { id: 'archanai-confirm' });
        } else {
            toast.success('Archanai booking cancelled', { id: 'archanai-cancel' });
        }
        setItems(items.map(item => item.id === id ? { ...item, status: newStatus } : item));
    };

    const columns = [
        { key: 'id', label: 'Booking ID', sortable: true, render: (item) => <span className="font-mono font-medium text-primary">{item.id}</span> },
        { key: 'name', label: 'Devotee Name', sortable: true },
        { key: 'service', label: 'Archanai Type', sortable: true },
        { key: 'amount', label: 'Amount', sortable: true, render: (item) => <span className="font-bold">{item.amount}</span> },
        { key: 'date', label: 'Date', sortable: true, render: (item) => <span>{formatDate(item.date)}</span> },
        {
            key: 'status', label: 'Status', sortable: true, render: (item) => {
                const colors = { 'Approved': 'bg-green-100 text-green-800', 'Pending Approval': 'bg-yellow-100 text-yellow-800', 'Rejected': 'bg-red-100 text-red-800' };
                return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[item.status]}`}>{item.status}</span>;
            }
        },
        {
            key: 'actions', label: 'Actions', sortable: false, render: (item) => (
                <div className="flex gap-2">
                    {item.status === 'Pending Approval' && (
                        <>
                            <button onClick={() => handleApproval(item.id, true)} className="p-1.5 rounded-md text-green-600 hover:bg-green-50 flex items-center gap-1 text-xs border border-green-200"><CheckCircle size={14} /> Confirm Time</button>
                            <button onClick={() => handleApproval(item.id, false)} className="p-1.5 rounded-md text-red-600 hover:bg-red-50 flex items-center gap-1 text-xs border border-red-200"><XCircle size={14} /> Cancel</button>
                        </>
                    )}
                </div>
            ),
        }
    ];

    const filterOptions = [
        { key: 'status', label: 'Status', options: APPROVAL_STATUS_OPTIONS },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Archanai Bookings</h2>
                <p className="text-gray-600 mt-1">Manage online Archanai schedules and devotee bookings.</p>
            </div>
            <DataTable data={items} columns={columns} exportFileName="Archanai_Export" searchPlaceholder="Search ID, Devotee, Type..." filterOptions={filterOptions} />
        </div>
    );
};

export default Archanai;
