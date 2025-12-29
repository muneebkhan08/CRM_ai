'use client';

import { useEffect, useState } from 'react';
import { analyticsApi, AnalyticsOverview } from '@/lib/api';
import { formatCurrency, formatNumber } from '@/lib/utils';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Area,
    AreaChart,
} from 'recharts';
import { TrendingUp, Users, DollarSign, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#6366f1'];

export default function AnalyticsPage() {
    const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
    const [revenueData, setRevenueData] = useState<any[]>([]);
    const [leadSources, setLeadSources] = useState<any[]>([]);
    const [industries, setIndustries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [overviewRes, revenueRes, sourcesRes, industriesRes] = await Promise.all([
                analyticsApi.getOverview(),
                analyticsApi.getRevenueChart(),
                analyticsApi.getLeadSources(),
                analyticsApi.getCustomerIndustries(),
            ]);
            setAnalytics(overviewRes.data);
            setRevenueData(revenueRes.data);
            setLeadSources(sourcesRes.data);
            setIndustries(industriesRes.data);
        } catch (err) {
            console.error('Failed to load analytics:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pt-12 lg:pt-0 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-500 mt-1">Insights and performance metrics</p>
                </div>
                <Link href="/agent" className="btn-primary inline-flex items-center gap-2">
                    Get AI Growth Plan <ArrowRight size={18} />
                </Link>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="pro-card p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-green-50 text-green-600 border border-green-100">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics?.total_revenue || 0)}</p>
                        </div>
                    </div>
                </div>
                <div className="pro-card p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Active Customers</p>
                            <p className="text-2xl font-bold text-gray-900">{analytics?.active_customers || 0}</p>
                        </div>
                    </div>
                </div>
                <div className="pro-card p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                            <Target size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                            <p className="text-2xl font-bold text-gray-900">{(analytics?.lead_conversion_rate || 0).toFixed(1)}%</p>
                        </div>
                    </div>
                </div>
                <div className="pro-card p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-yellow-50 text-yellow-600 border border-yellow-100">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Win Rate</p>
                            <p className="text-2xl font-bold text-gray-900">{(analytics?.win_rate || 0).toFixed(1)}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="pro-card p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenue Over Time</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `$${formatNumber(v)}`} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        color: '#1e293b'
                                    }}
                                    formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Lead Sources */}
                <div className="pro-card p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Lead Sources</h3>
                    <div className="h-72 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={leadSources}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="count"
                                >
                                    {leadSources.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">{leadSources.reduce((acc, curr) => acc + curr.count, 0)}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Leads</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {leadSources.slice(0, 5).map((source, index) => (
                            <div key={source.source} className="flex items-center gap-2 text-sm">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <span className="text-gray-600 dark:text-gray-300">{source.source}</span>
                                <span className="font-bold text-gray-900 dark:text-white">({source.count})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Industries */}
                <div className="pro-card p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Customers by Industry</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={industries.slice(0, 8)} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis dataKey="industry" type="category" stroke="#64748b" fontSize={12} width={100} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    }}
                                />
                                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Metrics Summary */}
                <div className="pro-card p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Performance Metrics</h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Customer Retention', value: analytics?.retention_rate || 0, color: 'bg-green-500' },
                            { label: 'Lead Conversion', value: analytics?.lead_conversion_rate || 0, color: 'bg-blue-500' },
                            { label: 'Win Rate', value: analytics?.win_rate || 0, color: 'bg-purple-500' },
                            { label: 'Marketing ROI', value: Math.min(analytics?.marketing_roi || 0, 100), color: 'bg-yellow-500' },
                        ].map((metric) => (
                            <div key={metric.label}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600 dark:text-gray-300 font-medium">{metric.label}</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{metric.value.toFixed(1)}%</span>
                                </div>
                                <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${metric.color} rounded-full transition-all duration-500`}
                                        style={{ width: `${Math.min(metric.value, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Avg. Deal Size</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                                {formatCurrency(analytics?.avg_deal_size || 0)}
                            </p>
                        </div>
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Avg. Customer LTV</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                                {formatCurrency(analytics?.avg_ltv || 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Insights */}
            <div className="pro-card p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="text-green-400" /> Quick Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                        <p className="text-gray-300 text-sm mb-2">Top Lead Source</p>
                        <p className="text-xl font-bold text-white">{analytics?.best_lead_source || 'N/A'}</p>
                        <p className="text-xs text-green-400 mt-2 font-medium bg-green-400/10 inline-block px-2 py-1 rounded">Highest conversion rate</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                        <p className="text-gray-300 text-sm mb-2">Top Industry</p>
                        <p className="text-xl font-bold text-white">{analytics?.top_industry || 'N/A'}</p>
                        <p className="text-xs text-green-400 mt-2 font-medium bg-green-400/10 inline-block px-2 py-1 rounded">Highest revenue contribution</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
                        <p className="text-gray-300 text-sm mb-2">Best Channel</p>
                        <p className="text-xl font-bold text-white">{analytics?.top_acquisition_channel || 'N/A'}</p>
                        <p className="text-xs text-green-400 mt-2 font-medium bg-green-400/10 inline-block px-2 py-1 rounded">Most customer acquisitions</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
