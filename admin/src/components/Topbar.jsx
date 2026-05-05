import React, { useState, useEffect } from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { subscribeDonations } from '../services/donationService';
import { subscribeComments } from '../services/commentService';
import { subscribeContactMessages } from '../services/contactService';

const Topbar = ({ isSidebarCollapsed, setIsSidebarCollapsed }) => {
    const { user, logout } = useAuth();
    const [counts, setCounts] = useState({
        donations: 0,
        comments: 0,
        messages: 0
    });

    useEffect(() => {
        const unsubs = [
            subscribeDonations(items => {
                const pending = items.filter(d => d.status === 'pending').length;
                setCounts(prev => ({ ...prev, donations: pending }));
            }),
            subscribeComments(items => {
                const pending = items.filter(c => c.status === 'pending').length;
                setCounts(prev => ({ ...prev, comments: pending }));
            }),
            subscribeContactMessages(items => {
                const pending = items.filter(m => m.status === 'pending').length;
                setCounts(prev => ({ ...prev, messages: pending }));
            })
        ];
        return () => unsubs.forEach(unsub => unsub());
    }, []);

    const totalNotifications = counts.donations + counts.comments + counts.messages;

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-10 shadow-sm">
            <div className="flex items-center">
                {/* Mobile menu toggle */}
                <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="mr-4 p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none sm:hidden"
                >
                    <Menu size={20} />
                </button>
                <h1 className="font-serif text-xl sm:text-2xl text-primary m-0 hidden sm:block">Admin Portal</h1>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors relative" title={`${totalNotifications} Pending Actions`}>
                    <Bell size={20} />
                    {totalNotifications > 0 && (
                        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center bg-red-500 text-[10px] font-bold text-white rounded-full border-2 border-white">
                            {totalNotifications > 9 ? '9+' : totalNotifications}
                        </span>
                    )}
                </button>

                <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-sm font-medium text-gray-700">{user?.name || 'Administrator'}</span>
                        <span className="text-xs text-gray-500 capitalize">{user?.role || 'admin'}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <User size={18} />
                    </div>
                    <button
                        onClick={logout}
                        className="ml-2 p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
