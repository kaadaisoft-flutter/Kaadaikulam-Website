import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { logo } from '../assets/images';
import { useAuth } from '../context/AuthContext';
import { subscribeComments } from '../services/commentService';
import { subscribeDonations } from '../services/donationService';
import { subscribeContactMessages } from '../services/contactService';
import {
    LayoutDashboard,
    Image as ImageIcon,
    FileText,
    MessageSquare,
    Mail,
    Settings,
    ChevronLeft,
    ChevronRight,
    Plus,
    LogOut,
    Trash2,
    BarChart2,
    Users,
    Inbox,
    HeartHandshake,
    CalendarDays
} from 'lucide-react';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [counts, setCounts] = useState({
        comments: 0,
        donations: 0,
        messages: 0,
    });

    useEffect(() => {
        const unsubComments = subscribeComments((data) => {
            setCounts(prev => ({ ...prev, comments: data.filter(i => i.status === 'pending').length }));
        });
        const unsubDonations = subscribeDonations((data) => {
            setCounts(prev => ({ ...prev, donations: data.filter(i => i.status === 'pending').length }));
        });
        const unsubMessages = subscribeContactMessages((data) => {
            setCounts(prev => ({ ...prev, messages: data.filter(i => i.status === 'pending').length }));
        });

        return () => {
            unsubComments();
            unsubDonations();
            unsubMessages();
        };
    }, []);

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    const menuGroups = [
        {
            title: 'Core Management',
            items: [
                { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
                { path: '/admin/blog', icon: FileText, label: 'All Blogs' },
                { path: '/admin/gallery', icon: ImageIcon, label: 'Gallery' },
                { path: '/admin/events', icon: CalendarDays, label: 'Events' },
                { path: '/admin/comments', icon: MessageSquare, label: 'Comments', badge: counts.comments },
                { path: '/admin/donation', icon: HeartHandshake, label: 'Donations', badge: counts.donations },
            ]
        },
        {
            title: 'Communication',
            items: [
                { path: '/admin/contact', icon: Mail, label: 'Messages', badge: counts.messages },
                { path: '/admin/donation-settings', icon: Settings, label: 'Settings' },
            ]
        }
    ];

    return (
        <aside
            className={`
                relative flex flex-col bg-[#1A1C1E] text-gray-400 transition-all duration-300 ease-in-out z-30
                ${isCollapsed ? 'w-20' : 'w-72'}
            `}
        >
            {/* Logo Section */}
            <div className="h-24 flex items-center px-6 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center shrink-0">
                        <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col"
                        >
                            <span className="text-white font-bold text-lg leading-tight">Poondurai</span>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Admin Panel</span>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4 space-y-8 scrollbar-hide">
                {menuGroups.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-2">
                        {!isCollapsed && (
                            <span className="px-4 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-4 block">
                                {group.title}
                            </span>
                        )}
                        <ul className="space-y-1">
                            {group.items.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        end={item.path === '/admin'}
                                        className={({ isActive }) => `
                                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group
                                            ${isActive
                                                ? 'bg-primary/10 text-white font-semibold'
                                                : 'hover:bg-white/5 hover:text-white'}
                                            ${isCollapsed ? 'justify-center' : ''}
                                        `}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <item.icon size={20} className={`
                                                    transition-colors
                                                    ${isActive ? 'text-primary' : 'group-hover:text-white'}
                                                `} />
                                                {!isCollapsed && <span className="flex-1 text-sm">{item.label}</span>}
                                                {item.badge > 0 && !isCollapsed && (
                                                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                        {item.badge}
                                                    </span>
                                                )}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="active-pill"
                                                        className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                                                    />
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Add New Blog Button - Special Highlight */}
                <div className="pt-4">
                    <button
                        onClick={() => navigate('/admin/blog/add')}
                        className={`
                            flex items-center gap-3 w-full bg-primary text-white p-4 rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95
                            ${isCollapsed ? 'justify-center p-3' : ''}
                        `}
                    >
                        <Plus size={20} className="shrink-0" />
                        {!isCollapsed && <span className="font-bold text-sm">Add New Blog</span>}
                    </button>
                </div>

                <div className="pt-2">
                    <button
                        className={`
                            flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all
                            ${isCollapsed ? 'justify-center' : ''}
                        `}
                    >
                        <Trash2 size={20} />
                        {!isCollapsed && <span className="text-sm font-medium">Trash</span>}
                    </button>
                </div>
            </div>

            {/* User Profile / Logout Section */}
            <div className="p-4 mt-auto">
                {!isCollapsed ? (
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-white text-sm font-bold truncate">{user?.name || 'admin'}</span>
                                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">{user?.role || 'Administrator'}</span>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-400/10 text-red-400 text-xs font-bold hover:bg-red-400/20 transition-all border border-red-400/20"
                        >
                            <LogOut size={14} />
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={logout}
                        className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-all border border-red-400/20"
                        title="Sign Out"
                    >
                        <LogOut size={20} />
                    </button>
                )}
            </div>

            {/* Collapse Toggle Overlay */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-24 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-[#FAF5EE] hover:scale-110 transition-all z-40"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
        </aside>
    );
};

export default Sidebar;
