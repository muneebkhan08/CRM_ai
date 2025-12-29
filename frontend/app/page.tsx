'use client';

import { useEffect, useState } from 'react';
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
} from 'lucide-react';
import Link from 'next/link';
import { analyticsApi, AnalyticsOverview } from '@/lib/api';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon: React.ReactNode;
    color: string;
}

function StatCard({ title, value, change, icon, color }: StatCardProps) {
    return (
        <div className="stat-card fade-in bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 p-6 rounded-2xl">
            <div className="flex items-start justify-between">
                <div>
                    <p className="stat-label text-gray-500 dark:text-gray-400 font-medium text-sm">{title}</p>
                    <p className="stat-value mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                    {change !== undefined && (
                        <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${change >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                            {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            <span>{Math.abs(change).toFixed(1)}%</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20`}>{icon}</div>
            </div>
        </div>
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
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pt-12 lg:pt-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's your business overview.</p>
                </div>
                <Link href="/agent" className="glow-button inline-flex items-center gap-2">
                    Get AI Growth Plan <ArrowRight size={18} />
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Customers"
                    value={formatNumber(analytics?.total_customers || 0)}
                    change={5.2}
                    icon={<Users size={24} className="text-primary-400" />}
                    color="bg-primary-500/20"
                />
                <StatCard
                    title="Active Leads"
                    value={formatNumber(analytics?.total_leads || 0)}
                    change={analytics?.lead_conversion_rate}
                    icon={<Target size={24} className="text-accent-400" />}
                    color="bg-accent-500/20"
                />
                <StatCard
                    title="Active Deals"
                    value={formatNumber(analytics?.active_deals || 0)}
                    icon={<Briefcase size={24} className="text-yellow-400" />}
                    color="bg-yellow-500/20"
                />
                <StatCard
                    title="Pipeline Value"
                    value={formatCurrency(analytics?.pipeline_value || 0)}
                    icon={<DollarSign size={24} className="text-green-400" />}
                    color="bg-green-500/20"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Overview */}
                <div className="lg:col-span-2 glass-card p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Revenue Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Revenue (YTD)</p>
                            <p className="text-2xl font-bold text-green-400 mt-1">
                                {formatCurrency(analytics?.total_revenue || 0)}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Monthly Recurring</p>
                            <p className="text-2xl font-bold text-primary-400 mt-1">
                                {formatCurrency(analytics?.mrr || 0)}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Avg. Deal Size</p>
                            <p className="text-2xl font-bold text-accent-400 mt-1">
                                {formatCurrency(analytics?.avg_deal_size || 0)}
                            </p>
                        </div>
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
                            ].map((item) => (
                                <div key={item.stage} className="flex items-center gap-4">
                                    <div className="w-28 text-sm text-gray-500 dark:text-gray-400">{item.stage}</div>
                                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${item.color} rounded-full transition-all duration-500`}
                                            style={{ width: `${Math.min((item.count / 20) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <div className="w-12 text-right text-sm font-medium text-gray-900 dark:text-white">{item.count}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-6">
                    {/* Tasks Summary */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tasks Overview</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="text-yellow-400" size={20} />
                                    <span className="text-gray-600 dark:text-gray-300">Open Tasks</span>
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">{analytics?.open_tasks || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="text-red-400" size={20} />
                                    <span className="text-gray-600 dark:text-gray-300">Overdue</span>
                                </div>
                                <span className="font-semibold text-red-400">{analytics?.overdue_tasks || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="text-green-400" size={20} />
                                    <span className="text-gray-600 dark:text-gray-300">Completed (7d)</span>
                                </div>
                                <span className="font-semibold text-green-400">{analytics?.completed_tasks_7d || 0}</span>
                            </div>
                        </div>
                        <Link
                            href="/tasks"
                            className="mt-4 inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 text-sm"
                        >
                            View All Tasks <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Key Metrics */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Key Metrics</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500 dark:text-gray-400">Win Rate</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{(analytics?.win_rate || 0).toFixed(1)}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 rounded-full"
                                        style={{ width: `${analytics?.win_rate || 0}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500 dark:text-gray-400">Lead Conversion</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{(analytics?.lead_conversion_rate || 0).toFixed(1)}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary-500 rounded-full"
                                        style={{ width: `${analytics?.lead_conversion_rate || 0}%` }}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500 dark:text-gray-400">Retention Rate</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{(analytics?.retention_rate || 0).toFixed(1)}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-accent-500 rounded-full"
                                        style={{ width: `${analytics?.retention_rate || 0}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Performers */}
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Top Insights</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Best Lead Source</span>
                                <span className="badge badge-active">{analytics?.best_lead_source || 'N/A'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Top Industry</span>
                                <span className="badge badge-prospect">{analytics?.top_industry || 'N/A'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500 dark:text-gray-400">Top Channel</span>
                                <span className="badge badge-medium">{analytics?.top_acquisition_channel || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
