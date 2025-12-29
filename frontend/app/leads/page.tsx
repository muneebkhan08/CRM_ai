'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Target, TrendingUp, ArrowRight, Filter } from 'lucide-react';
import { leadApi, Lead } from '@/lib/api';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import Link from 'next/link';

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [sourceFilter, setSourceFilter] = useState('');

    useEffect(() => {
        loadLeads();
    }, [statusFilter, sourceFilter]);

    const loadLeads = async () => {
        try {
            const response = await leadApi.getAll({
                status: statusFilter || undefined,
                source: sourceFilter || undefined,
            });
            setLeads(response.data);
        } catch (err) {
            console.error('Failed to load leads:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleConvert = async (id: number) => {
        if (confirm('Convert this lead to a customer?')) {
            try {
                await leadApi.convert(id);
                loadLeads();
            } catch (err) {
                console.error('Failed to convert:', err);
            }
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 70) return 'text-green-600 dark:text-green-400';
        if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getScoreBar = (score: number) => {
        if (score >= 70) return 'bg-green-500';
        if (score >= 40) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const sources = Array.from(new Set(leads.map(l => l.source).filter(Boolean)));

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leads</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Track and convert your leads</p>
                </div>
                <button className="btn-primary">
                    <Plus size={18} /> Add Lead
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        className="input-field pl-10"
                    />
                </div>
                <div className="flex items-center gap-2 md:w-auto w-full">
                    <Filter className="text-gray-400 dark:text-gray-500 hidden md:block" size={20} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="input-field cursor-pointer"
                        title="Filter by status"
                        aria-label="Filter by status"
                    >
                        <option value="">All Status</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="proposal">Proposal</option>
                        <option value="negotiation">Negotiation</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                    </select>
                    <select
                        value={sourceFilter}
                        onChange={(e) => setSourceFilter(e.target.value)}
                        className="input-field cursor-pointer"
                        title="Filter by source"
                        aria-label="Filter by source"
                    >
                        <option value="">All Sources</option>
                        {sources.map(source => (
                            <option key={source} value={source}>{source}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Leads Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {leads.map((lead) => (
                        <div
                            key={lead.id}
                            className="pro-card p-6 fade-in hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{lead.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{lead.company || 'No company'}</p>
                                    {lead.job_title && (
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{lead.job_title}</p>
                                    )}
                                </div>
                                <span className={`badge ${getStatusColor(lead.status) === 'badge-active' ? 'badge-success' : 'badge-neutral'}`}>
                                    {lead.status}
                                </span>
                            </div>

                            {/* Score */}
                            <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">Lead Score</span>
                                    <span className={`font-bold ${getScoreColor(lead.score)}`}>
                                        {lead.score}/100
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getScoreBar(lead.score)} rounded-full transition-all`}
                                    />
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-3 text-sm mb-6 border-t border-gray-100 dark:border-gray-600 pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 dark:text-gray-400">Est. Value</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(lead.estimated_value)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 dark:text-gray-400">Source</span>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{lead.source || '-'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 dark:text-gray-400">Added</span>
                                    <span className="text-gray-700 dark:text-gray-300">{formatDate(lead.created_at)}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            {lead.status !== 'won' && lead.status !== 'lost' && (
                                <button
                                    onClick={() => handleConvert(lead.id)}
                                    className="w-full py-2.5 px-4 rounded-lg bg-white dark:bg-gray-800 border border-primary text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    Convert to Customer <ArrowRight size={16} />
                                </button>
                            )}
                            {lead.status === 'won' && (
                                <div className="text-center py-2.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium border border-green-100 dark:border-green-900/30">
                                    ✓ Converted to customer
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="pro-card p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{leads.length}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-1">Total Leads</p>
                </div>
                <div className="pro-card p-4 text-center">
                    <p className="text-2xl font-bold text-blue-500">
                        {leads.filter(l => l.status === 'new').length}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-1">New</p>
                </div>
                <div className="pro-card p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-500">
                        {leads.filter(l => l.status === 'qualified').length}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-1">Qualified</p>
                </div>
                <div className="pro-card p-4 text-center">
                    <p className="text-2xl font-bold text-green-500">
                        {leads.filter(l => l.status === 'won').length}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-1">Won</p>
                </div>
                <div className="pro-card p-4 text-center">
                    <p className="text-2xl font-bold text-purple-500">
                        {formatCurrency(leads.reduce((sum, l) => sum + l.estimated_value, 0))}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-1">Pipeline Value</p>
                </div>
            </div>
        </div>
    );
}
