'use client';

import { useEffect, useState } from 'react';
import { Plus, DollarSign, TrendingUp, Calendar, ChevronRight, ChevronLeft, Check, X } from 'lucide-react';
import { dealApi, Deal } from '@/lib/api';
import { formatCurrency, formatDate, getStageLabel } from '@/lib/utils';

const STAGES = [
    { key: 'prospecting', label: 'Prospecting', color: 'border-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300' },
    { key: 'qualification', label: 'Qualification', color: 'border-sky-500', bg: 'bg-sky-50 dark:bg-sky-900/20', text: 'text-sky-700 dark:text-sky-300' },
    { key: 'proposal', label: 'Proposal', color: 'border-purple-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-700 dark:text-indigo-300' },
    { key: 'negotiation', label: 'Negotiation', color: 'border-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-300' },
    { key: 'closed_won', label: 'Won', color: 'border-green-500', bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-300' },
    { key: 'closed_lost', label: 'Lost', color: 'border-red-500', bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-300' },
];

export default function DealsPage() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    const [pipelineData, setPipelineData] = useState<any[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [dealsRes, pipelineRes] = await Promise.all([
                dealApi.getAll(),
                dealApi.getPipeline(),
            ]);
            setDeals(dealsRes.data);
            setPipelineData(pipelineRes.data);
        } catch (err) {
            console.error('Failed to load deals:', err);
        } finally {
            setLoading(false);
        }
    };

    const getDealsByStage = (stage: string) => {
        return deals.filter(deal => deal.stage === stage);
    };

    const getStageStats = (stage: string) => {
        const stageDeals = getDealsByStage(stage);
        return {
            count: stageDeals.length,
            value: stageDeals.reduce((sum, d) => sum + d.value, 0),
        };
    };

    const handleStageChange = async (dealId: number, newStage: string) => {
        try {
            await dealApi.updateStage(dealId, newStage);
            loadData();
        } catch (err) {
            console.error('Failed to update stage:', err);
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
        <div className="space-y-6 pt-12 lg:pt-0 w-full mx-auto h-[calc(100vh-100px)] flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Deals Pipeline</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Track your sales opportunities</p>
                </div>
                <button className="btn-primary">
                    <Plus size={18} /> New Deal
                </button>
            </div>

            {/* Pipeline Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
                <div className="pro-card p-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Deals</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{deals.length}</p>
                </div>
                <div className="pro-card p-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pipeline Value</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                        {formatCurrency(deals.filter(d => !d.stage.includes('closed')).reduce((sum, d) => sum + d.value, 0))}
                    </p>
                </div>
                <div className="pro-card p-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Avg. Deal Size</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                        {formatCurrency(deals.length > 0 ? deals.reduce((sum, d) => sum + d.value, 0) / deals.length : 0)}
                    </p>
                </div>
                <div className="pro-card p-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Win Rate</p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                        {deals.filter(d => d.stage === 'closed_won').length > 0
                            ? ((deals.filter(d => d.stage === 'closed_won').length /
                                (deals.filter(d => d.stage.includes('closed')).length || 1)) * 100).toFixed(0)
                            : 0}%
                    </p>
                </div>
            </div>

            {/* Pipeline Board */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-2">
                <div className="flex gap-6 min-w-full h-full px-1">
                    {STAGES.map((stage) => {
                        const stageDeals = getDealsByStage(stage.key);
                        const stats = getStageStats(stage.key);

                        return (
                            <div key={stage.key} className="w-80 flex-shrink-0 flex flex-col h-full bg-gray-50/50 dark:bg-gray-800/50 rounded-xl p-2 border border-gray-100 dark:border-gray-700">
                                {/* Stage Header */}
                                <div className={`p-4 mb-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm border-t-4 ${stage.color} flex-shrink-0`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-gray-900 dark:text-white">{stage.label}</h3>
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stage.bg} ${stage.text}`}>
                                            {stats.count}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        {formatCurrency(stats.value)}
                                    </p>
                                </div>

                                {/* Deal Cards */}
                                <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    {stageDeals.map((deal) => (
                                        <div key={deal.id} className="pro-card p-4 cursor-pointer hover:border-primary/50 group">
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary dark:group-hover:text-primary-400 transition-colors">{deal.title}</h4>

                                            <div className="flex items-center gap-2 text-gray-900 dark:text-white mb-3">
                                                <div className="p-1 rounded bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                                                    <DollarSign size={14} />
                                                </div>
                                                <span className="font-bold">{formatCurrency(deal.value)}</span>
                                            </div>

                                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
                                                <div className="flex items-center gap-1">
                                                    <TrendingUp size={14} />
                                                    <span>{deal.probability}%</span>
                                                </div>
                                                {deal.expected_close_date && (
                                                    <div className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        <span>{formatDate(deal.expected_close_date)}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Stage Actions */}
                                            {!stage.key.includes('closed') && (
                                                <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {stage.key !== 'prospecting' && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const prevIndex = STAGES.findIndex(s => s.key === stage.key) - 1;
                                                                if (prevIndex >= 0) {
                                                                    handleStageChange(deal.id, STAGES[prevIndex].key);
                                                                }
                                                            }}
                                                            className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
                                                            title="Move Back"
                                                        >
                                                            <ChevronLeft size={16} />
                                                        </button>
                                                    )}

                                                    <div className="flex-1"></div>

                                                    {stage.key === 'negotiation' ? (
                                                        <>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleStageChange(deal.id, 'closed_lost');
                                                                }}
                                                                className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                                                                title="Mark as Lost"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleStageChange(deal.id, 'closed_won');
                                                                }}
                                                                className="py-1 px-3 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors flex items-center gap-1 text-xs font-bold"
                                                                title="Mark as Won"
                                                            >
                                                                <Check size={14} /> Won
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const nextIndex = STAGES.findIndex(s => s.key === stage.key) + 1;
                                                                if (nextIndex < STAGES.length - 2) {
                                                                    handleStageChange(deal.id, STAGES[nextIndex].key);
                                                                }
                                                            }}
                                                            className="p-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-primary-700 dark:text-primary-300 transition-colors"
                                                            title="Move Forward"
                                                        >
                                                            <ChevronRight size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {stageDeals.length === 0 && (
                                        <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-400 dark:text-gray-500 text-sm">
                                            No deals here yet
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
