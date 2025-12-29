'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Target,
    Briefcase,
    DollarSign,
    TrendingUp,
    TrendingDown,
    AlertCircle,
    CheckCircle,
    ArrowRight,
    Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { analyticsApi, AnalyticsOverview } from '@/lib/api';
import { formatCurrency, formatNumber } from '@/lib/utils';
import dynamic from 'next/dynamic';

// Dynamic import for 3D scene (client-side only)
const FloatingOrb = dynamic(
    () => import('@/components/ThreeScene').then((mod) => mod.FloatingOrb),
    { ssr: false }
);

interface StatCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon: React.ReactNode;
    color: string;
    delay?: number;
}

function StatCard({ title, value, change, icon, color, delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
            whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
            className="stat-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-6 rounded-2xl cursor-pointer"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="stat-label text-gray-500 dark:text-gray-400 font-medium text-sm">{title}</p>
                    <motion.p
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring', stiffness: 100 }}
                        className="stat-value mt-2 text-2xl font-bold text-gray-900 dark:text-white"
                    >
                        {value}
                    </motion.p>
                    {change !== undefined && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: delay + 0.3 }}
                            className={`flex items-center gap-1 mt-2 text-sm font-medium ${change >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}
                        >
                            {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            <span>{Math.abs(change).toFixed(1)}%</span>
                        </motion.div>
                    )}
                </div>
                <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`p-3 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20`}
                >
                    {icon}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function Dashboard() {
    const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        setLoading(true);
        const response = await analyticsApi.getOverview();
        setAnalytics(response.data);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="space-y-8 relative">
            {/* 3D Background Orb */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none hidden lg:block">
                <FloatingOrb />
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl font-bold text-gray-900 dark:text-white"
                    >
                        Dashboard
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-500 dark:text-gray-400 mt-1"
                    >
                        Welcome back! Here's your business overview.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link href="/agent" className="glow-button inline-flex items-center gap-2">
                        <Sparkles size={18} /> Get AI Growth Plan <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Customers"
                    value={formatNumber(analytics?.total_customers || 0)}
                    change={5.2}
                    icon={<Users size={24} className="text-green-500" />}
                    color="bg-green-500"
                    delay={0.1}
                />
                <StatCard
                    title="Active Leads"
                    value={formatNumber(analytics?.total_leads || 0)}
                    change={analytics?.lead_conversion_rate}
                    icon={<Target size={24} className="text-purple-500" />}
                    color="bg-purple-500"
                    delay={0.2}
                />
                <StatCard
                    title="Active Deals"
                    value={formatNumber(analytics?.active_deals || 0)}
                    icon={<Briefcase size={24} className="text-yellow-500" />}
                    color="bg-yellow-500"
                    delay={0.3}
                />
                <StatCard
                    title="Pipeline Value"
                    value={formatCurrency(analytics?.pipeline_value || 0)}
                    icon={<DollarSign size={24} className="text-blue-500" />}
                    color="bg-blue-500"
                    delay={0.4}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="lg:col-span-2 glass-card p-6"
                >
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Revenue Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800"
                        >
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Revenue (YTD)</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                                {formatCurrency(analytics?.total_revenue || 0)}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800"
                        >
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Monthly Recurring</p>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                                {formatCurrency(analytics?.mrr || 0)}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800"
                        >
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Avg. Deal Size</p>
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                                {formatCurrency(analytics?.avg_deal_size || 0)}
                            </p>
                        </motion.div>
                    </div>

                    {/* Pipeline Progress */}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Deal Pipeline</h3>
                        <div className="space-y-4">
                            {[
                                { stage: 'Prospecting', count: analytics?.deals_prospecting || 0, color: 'bg-blue-500' },
                                { stage: 'Qualification', count: analytics?.deals_qualification || 0, color: 'bg-cyan-500' },
                                { stage: 'Proposal', count: analytics?.deals_proposal || 0, color: 'bg-purple-500' },
                                { stage: 'Negotiation', count: analytics?.deals_negotiation || 0, color: 'bg-orange-500' },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.stage}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 + index * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-28 text-sm text-gray-600 dark:text-gray-400">{item.stage}</div>
                                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((item.count / 20) * 100, 100)}%` }}
                                            transition={{ duration: 1, delay: 1 + index * 0.1, ease: 'easeOut' }}
                                            className={`h-full ${item.color} rounded-full`}
                                        />
                                    </div>
                                    <div className="w-12 text-right text-sm font-medium text-gray-900 dark:text-white">{item.count}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <div className="space-y-6">
                    {/* Tasks Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="glass-card p-6"
                    >
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tasks Overview</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Open Tasks', value: analytics?.open_tasks || 0, icon: AlertCircle, color: 'text-yellow-500' },
                                { label: 'Overdue', value: analytics?.overdue_tasks || 0, icon: AlertCircle, color: 'text-red-500' },
                                { label: 'Completed (7d)', value: analytics?.completed_tasks_7d || 0, icon: CheckCircle, color: 'text-green-500' },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className={item.color} size={20} />
                                        <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
                                    </div>
                                    <span className={`font-semibold ${item.color}`}>{item.value}</span>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div whileHover={{ x: 4 }} className="mt-4">
                            <Link
                                href="/tasks"
                                className="inline-flex items-center gap-2 text-green-600 hover:text-green-500 text-sm font-medium"
                            >
                                View All Tasks <ArrowRight size={14} />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Key Metrics */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="glass-card p-6"
                    >
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Key Metrics</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Win Rate', value: analytics?.win_rate || 0, color: 'bg-green-500' },
                                { label: 'Lead Conversion', value: analytics?.lead_conversion_rate || 0, color: 'bg-blue-500' },
                                { label: 'Retention Rate', value: analytics?.retention_rate || 0, color: 'bg-purple-500' },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                >
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{item.value.toFixed(1)}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.value}%` }}
                                            transition={{ duration: 1, delay: 0.9 + index * 0.1, ease: 'easeOut' }}
                                            className={`h-full ${item.color} rounded-full`}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Top Insights */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="glass-card p-6"
                    >
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Top Insights</h3>
                        <div className="space-y-3 text-sm">
                            {[
                                { label: 'Best Lead Source', value: analytics?.best_lead_source || 'N/A', badge: 'badge-success' },
                                { label: 'Top Industry', value: analytics?.top_industry || 'N/A', badge: 'badge-neutral' },
                                { label: 'Top Channel', value: analytics?.top_acquisition_channel || 'N/A', badge: 'badge-warning' },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 + index * 0.1 }}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center justify-between"
                                >
                                    <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                                    <span className={`badge ${item.badge}`}>{item.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
