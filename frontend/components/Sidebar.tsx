'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Target,
    Briefcase,
    CheckSquare,
    BarChart3,
    Bot,
    Settings,
    Menu,
    X,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/customers', label: 'Customers', icon: Users },
    { href: '/leads', label: 'Leads', icon: Target },
    { href: '/deals', label: 'Deals', icon: Briefcase },
    { href: '/tasks', label: 'Tasks', icon: CheckSquare },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/agent', label: 'AI Agent', icon: Bot },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <button
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 lg:hidden shadow-sm"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? <X size={24} className="text-gray-600 dark:text-gray-300" /> : <Menu size={24} className="text-gray-600 dark:text-gray-300" />}
            </button>

            {/* Overlay for mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/20 dark:bg-black/50 z-30 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-300 lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">GrowthCRM</h1>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                        <ul className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                                ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold'
                                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <Icon size={20} className={isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'} />
                                            <span className="text-sm">{item.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Bottom section */}
                    <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-1">
                        <Link
                            href="/settings"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                        >
                            <Settings size={20} />
                            <span className="text-sm font-medium">Settings</span>
                        </Link>

                        {/* User Profile Snippet */}
                        <div className="mt-4 flex items-center gap-3 px-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                                <svg className="w-full h-full text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Admin User</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@growthcrm.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
