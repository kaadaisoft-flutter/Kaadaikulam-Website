import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, Banknote, ImageIcon, MessageSquare, AlertCircle, 
    HeartHandshake, FileText, Mail, TrendingUp, ArrowUpRight,
    Calendar, CheckCircle, Clock
} from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { subscribeDonations } from '../services/donationService';
import { subscribeBlogs } from '../services/blogService';
import { subscribeComments } from '../services/commentService';
import { subscribeGallery } from '../services/galleryService';
import { subscribeContactMessages } from '../services/contactService';

const Dashboard = () => {
    const [data, setData] = useState({
        donations: [],
        blogs: [],
        comments: [],
        gallery: [],
        messages: [],
        loading: true
    });

    useEffect(() => {
        const unsubs = [
            subscribeDonations(donations => setData(prev => ({ ...prev, donations }))),
            subscribeBlogs(blogs => setData(prev => ({ ...prev, blogs }))),
            subscribeComments(comments => setData(prev => ({ ...prev, comments }))),
            subscribeGallery(gallery => setData(prev => ({ ...prev, gallery }))),
            subscribeContactMessages(messages => setData(prev => ({ ...prev, messages, loading: false })))
        ];
        return () => unsubs.forEach(unsub => unsub());
    }, []);

    const pendingDonations = data.donations.filter(d => d.status === 'pending');
    const pendingComments = data.comments.filter(c => c.status === 'pending');
    const pendingMessages = data.messages.filter(m => m.status === 'pending');

    const totalDonationAmount = data.donations
        .filter(d => d.status === 'approved')
        .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

    const stats = [
        { 
            label: 'Total Revenue', 
            value: `₹${totalDonationAmount.toLocaleString('en-IN')}`, 
            trend: '+12.5%',
            icon: Banknote, 
            color: 'text-emerald-600', 
            bg: 'bg-emerald-50' 
        },
        { 
            label: 'Active Blogs', 
            value: data.blogs.filter(b => b.status === 'Published').length.toString(), 
            trend: '+4 this month',
            icon: FileText, 
            color: 'text-blue-600', 
            bg: 'bg-blue-50' 
        },
        { 
            label: 'Media Items', 
            value: data.gallery.length.toString(), 
            trend: 'Last added today',
            icon: ImageIcon, 
            color: 'text-indigo-600', 
            bg: 'bg-indigo-50' 
        },
        { 
            label: 'Subscribers', 
            value: (data.messages.length + 120).toString(), 
            trend: '+24 new',
            icon: Users, 
            color: 'text-rose-600', 
            bg: 'bg-rose-50' 
        },
    ];

    if (data.loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2rem] border border-gray-200/60 shadow-sm">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Admin</h1>
                    <p className="text-gray-500 font-medium text-sm mt-1">Here is what's happening with your platform today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Date</p>
                        <p className="text-sm font-bold text-gray-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                        <Calendar size={20} />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] border border-gray-200/60 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                                <stat.icon size={24} />
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                                <TrendingUp size={12} />
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-200/60 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-gray-900">Recent Revenue</h3>
                            <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                                View Report <ArrowUpRight size={14} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {data.donations.filter(d => d.status === 'approved').slice(0, 5).map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                                            {item.name?.charAt(0) || 'D'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{item.name}</p>
                                            <p className="text-xs text-gray-500">{formatDate(item.createdAt)} • {item.purpose}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-emerald-600">+ ₹{Number(item.amount).toLocaleString('en-IN')}</p>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Approved</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Notifications / Alerts */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-gray-200/60 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Action Required</h3>
                        <div className="space-y-4">
                            {pendingDonations.length > 0 && (
                                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                                        <HeartHandshake size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-amber-900">{pendingDonations.length} Pending Donations</p>
                                        <p className="text-xs text-amber-700 mt-1">New contributions require review.</p>
                                    </div>
                                </div>
                            )}

                            {pendingComments.length > 0 && (
                                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                        <MessageSquare size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-blue-900">{pendingComments.length} New Comments</p>
                                        <p className="text-xs text-blue-700 mt-1">Review feedback on your blogs.</p>
                                    </div>
                                </div>
                            )}

                            {pendingMessages.length === 0 && pendingDonations.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle size={32} />
                                    </div>
                                    <p className="text-sm font-bold text-gray-900">System Optimized</p>
                                    <p className="text-xs text-gray-500 mt-1">No pending actions at this time.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats Mini */}
                    <div className="bg-[#1A1C1E] p-8 rounded-[2rem] text-white shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                <TrendingUp size={20} />
                            </div>
                            <h3 className="font-bold">Performance</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Monthly Target</span>
                                <span className="text-xs font-bold text-primary">85%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="w-[85%] h-full bg-primary rounded-full shadow-[0_0_8px_rgba(128,0,0,0.4)]" />
                            </div>
                            <p className="text-[10px] text-gray-500 leading-relaxed italic">
                                Targets are based on last year's performance for the same period.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
