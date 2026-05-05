import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DataTable from '../../components/DataTable';
import { 
    CheckCircle, XCircle, Banknote, Clock, 
    ArrowUpRight, TrendingUp, Filter, Search,
    Check, X, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDateTime } from '../../utils/dateUtils';
import { DONATION_PURPOSE_OPTIONS, DONATION_STATUS_OPTIONS } from '../../constants';
import { subscribeDonations, updateDonationStatus } from '../../services/donationService';

const PURPOSE_LABELS = { general: 'General', maintenance: 'Maintenance', annadanam: 'Annadanam', festival: 'Festival' };

const Donations = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        const unsubscribe = subscribeDonations((data) => {
            setItems(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleApproval = async (id, isApproved) => {
        const newStatus = isApproved ? 'approved' : 'rejected';
        setUpdatingId(id);
        try {
            await updateDonationStatus(id, newStatus);
            toast.success(isApproved ? 'Donation approved' : 'Donation rejected');
        } catch (err) {
            console.error('Update failed:', err);
            toast.error('Failed to update donation');
        } finally {
            setUpdatingId(null);
        }
    };

    const stats = [
        { 
            label: 'Total Revenue', 
            value: `₹${items.filter(i => i.status === 'approved').reduce((acc, i) => acc + (Number(i.amount) || 0), 0).toLocaleString('en-IN')}`, 
            icon: Banknote, 
            color: 'text-emerald-600', 
            bg: 'bg-emerald-50' 
        },
        { 
            label: 'Pending Approvals', 
            value: items.filter(i => i.status === 'pending').length.toString(), 
            icon: Clock, 
            color: 'text-amber-600', 
            bg: 'bg-amber-50' 
        },
        { 
            label: 'Total Transactions', 
            value: items.length.toString(), 
            icon: TrendingUp, 
            color: 'text-blue-600', 
            bg: 'bg-blue-50' 
        }
    ];

    const columns = [
        { 
            key: 'name', 
            label: 'Devotee', 
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-400">
                        {item.name?.charAt(0) || 'D'}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{item.name}</span>
                        <span className="text-[10px] text-gray-400 font-medium">{item.email}</span>
                    </div>
                </div>
            )
        },
        { 
            key: 'purpose', 
            label: 'Purpose', 
            render: (item) => (
                <span className="text-xs font-semibold px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-gray-600 uppercase tracking-wider">
                    {PURPOSE_LABELS[item.purpose] || item.purpose}
                </span>
            )
        },
        { 
            key: 'amount', 
            label: 'Amount', 
            render: (item) => (
                <span className="font-bold text-gray-900">₹{item.amount?.toLocaleString('en-IN') || '0'}</span>
            )
        },
        { 
            key: 'createdAt', 
            label: 'Date', 
            render: (item) => (
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-700">{formatDateTime(item.createdAt).split('at')[0]}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{formatDateTime(item.createdAt).split('at')[1]}</span>
                </div>
            )
        },
        {
            key: 'status', 
            label: 'Status', 
            render: (item) => {
                const styles = {
                    approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
                    pending: 'bg-amber-50 text-amber-600 border-amber-100',
                    rejected: 'bg-red-50 text-red-600 border-red-100'
                };
                return (
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${styles[item.status] || 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                        {item.status || 'Unknown'}
                    </span>
                );
            }
        },
        {
            key: 'actions', 
            label: 'Actions', 
            render: (item) => (
                <div className="flex gap-2">
                    {item.status === 'pending' ? (
                        <>
                            <button 
                                onClick={() => handleApproval(item.id, true)} 
                                disabled={updatingId === item.id}
                                className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all shadow-sm"
                                title="Approve"
                            >
                                <Check size={18} />
                            </button>
                            <button 
                                onClick={() => handleApproval(item.id, false)} 
                                disabled={updatingId === item.id}
                                className="p-2 rounded-xl text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all shadow-sm"
                                title="Reject"
                            >
                                <X size={18} />
                            </button>
                        </>
                    ) : (
                        <div className="text-gray-300 px-2 italic text-[10px] font-medium uppercase tracking-widest">
                            Finalized
                        </div>
                    )}
                </div>
            ),
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] border border-gray-200/60 shadow-sm">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Donations Management</h1>
                    <p className="text-gray-500 font-medium text-sm mt-1">Review and approve incoming temple contributions.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-2xl border border-amber-100">
                    <AlertCircle size={16} />
                    <span className="text-xs font-bold uppercase tracking-wide">{items.filter(i => i.status === 'pending').length} Actions Pending</span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] border border-gray-200/60 shadow-sm flex items-center gap-4"
                    >
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <DataTable 
                data={items} 
                columns={columns} 
                exportFileName="Donations_Export" 
                searchPlaceholder="Search devotees, transaction ID..." 
                filterOptions={[
                    { key: 'status', label: 'Status', options: DONATION_STATUS_OPTIONS },
                    { key: 'purpose', label: 'Purpose', options: DONATION_PURPOSE_OPTIONS },
                ]} 
                initialFilters={{ status: 'pending' }} 
            />
        </div>
    );
};

export default Donations;
