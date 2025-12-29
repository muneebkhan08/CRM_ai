'use client';

import { useState } from 'react';
import { Send, Bot, User, Sparkles, Clock, Calendar, TrendingUp, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { analyticsApi, GrowthPlan } from '@/lib/api';

const TIMEFRAMES = [
    { key: 'day', label: 'Daily', icon: Clock, desc: 'Next 24 hours' },
    { key: 'week', label: 'Weekly', icon: Calendar, desc: 'Next 7 days' },
    { key: 'month', label: 'Monthly', icon: Calendar, desc: 'Next 30 days' },
    { key: 'quarter', label: 'Quarterly', icon: TrendingUp, desc: 'Next 90 days' },
    { key: 'year', label: 'Yearly', icon: TrendingUp, desc: 'Next 12 months' },
];

const FOCUS_AREAS = [
    { key: 'all', label: 'All Areas' },
    { key: 'sales', label: 'Sales' },
    { key: 'marketing', label: 'Marketing' },
    { key: 'retention', label: 'Customer Retention' },
];

export default function AgentPage() {
    const [selectedTimeframe, setSelectedTimeframe] = useState('week');
    const [selectedFocus, setSelectedFocus] = useState('all');
    const [loading, setLoading] = useState(false);
    const [growthPlan, setGrowthPlan] = useState<GrowthPlan | null>(null);
    const [chatMode, setChatMode] = useState(false);
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
    const [error, setError] = useState<string | null>(null);

    const generatePlan = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await analyticsApi.getGrowthPlan(selectedTimeframe, selectedFocus);
            setGrowthPlan(response.data);
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to generate plan. Check your Gemini API key.');
        } finally {
            setLoading(false);
        }
    };

    const askQuestion = async () => {
        if (!question.trim()) return;

        setChatHistory(prev => [...prev, { role: 'user', content: question }]);
        setQuestion('');
        setLoading(true);

        try {
            const response = await analyticsApi.askAgent(question);
            setChatHistory(prev => [...prev, { role: 'agent', content: response.data.answer }]);
        } catch (err: any) {
            setChatHistory(prev => [...prev, {
                role: 'agent',
                content: 'Sorry, I encountered an error. Please check your API key configuration.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const getPriorityColor = (priority: string) => {
        const colors: Record<string, string> = {
            high: 'border-red-500 bg-red-50',
            medium: 'border-yellow-500 bg-yellow-50',
            low: 'border-green-500 bg-green-50',
        };
        return colors[priority.toLowerCase()] || 'border-gray-500 bg-gray-50';
    };

    return (
        <div className="space-y-6 pt-12 lg:pt-0 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                            <Bot size={24} />
                        </div>
                        AI Growth Agent
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 ml-[52px]">Get AI-powered growth plans and business recommendations</p>
                </div>
                <div className="flex gap-2 bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <button
                        onClick={() => setChatMode(false)}
                        className={`px-4 py-2 rounded-lg transition-all font-medium ${!chatMode ? 'bg-primary text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        Growth Plans
                    </button>
                    <button
                        onClick={() => setChatMode(true)}
                        className={`px-4 py-2 rounded-lg transition-all font-medium ${chatMode ? 'bg-primary text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        Ask Agent
                    </button>
                </div>
            </div>

            {!chatMode ? (
                /* Growth Plan Mode */
                <div className="space-y-6">
                    {/* Timeframe Selection */}
                    <div className="pro-card p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Select Timeframe</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {TIMEFRAMES.map((tf) => {
                                const Icon = tf.icon;
                                const isSelected = selectedTimeframe === tf.key;
                                return (
                                    <button
                                        key={tf.key}
                                        onClick={() => setSelectedTimeframe(tf.key)}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${isSelected
                                            ? 'border-primary bg-primary-50 dark:bg-primary/10'
                                            : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600'
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${isSelected ? 'bg-white dark:bg-gray-800 text-primary' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                                            <Icon size={18} />
                                        </div>
                                        <p className={`font-bold ${isSelected ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{tf.label}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tf.desc}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Focus Area */}
                    <div className="pro-card p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Focus Area (Optional)</h3>
                        <div className="flex flex-wrap gap-3">
                            {FOCUS_AREAS.map((area) => (
                                <button
                                    key={area.key}
                                    onClick={() => setSelectedFocus(area.key)}
                                    className={`px-4 py-2 rounded-full border transition-all ${selectedFocus === area.key
                                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    {area.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={generatePlan}
                            disabled={loading}
                            className="btn-primary py-4 px-8 text-lg flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow w-full md:w-auto"
                        >
                            {loading ? (
                                <>
                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" /> Analyzing your data...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={24} /> Generate Growth Plan <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="p-4 rounded-xl border border-red-200 bg-red-50 flex items-center gap-3 text-red-700">
                            <AlertCircle size={20} />
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Growth Plan Results */}
                    {growthPlan && (
                        <div className="space-y-6 fade-in">
                            {/* Summary */}
                            <div className="pro-card p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                                        <Bot size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {selectedTimeframe.charAt(0).toUpperCase() + selectedTimeframe.slice(1)} Growth Plan
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Generated {new Date(growthPlan.generated_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{growthPlan.analysis_summary}</p>
                                </div>
                            </div>

                            {/* Key Insights */}
                            <div className="pro-card p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-yellow-100 text-yellow-600"><Sparkles size={18} /></div> Key Insights
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {growthPlan.key_insights.map((insight, index) => (
                                        <div key={index} className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 flex gap-4 hover:border-gray-200 dark:hover:border-gray-600 transition-colors">
                                            <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                                                <span className="text-primary font-bold text-sm">{index + 1}</span>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 font-medium">{insight}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Items */}
                            <div className="pro-card p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-green-100 text-green-600"><CheckCircle size={18} /></div> Recommended Actions
                                </h3>
                                <div className="space-y-4">
                                    {growthPlan.action_items.map((action, index) => (
                                        <div
                                            key={index}
                                            className={`p-5 rounded-xl border-l-4 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 ${getPriorityColor(action.priority)}`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-bold text-gray-900 dark:text-white text-lg">{action.title}</h4>
                                                <span className={`badge ${action.priority === 'high' ? 'badge-error' :
                                                    action.priority === 'medium' ? 'badge-warning' : 'badge-success'
                                                    }`}>
                                                    {action.priority} Priority
                                                </span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300">{action.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Risks */}
                            {growthPlan.risks_and_challenges.length > 0 && (
                                <div className="pro-card p-6 border-l-4 border-l-yellow-400">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <AlertCircle className="text-yellow-500" size={20} /> Risks & Challenges
                                    </h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {growthPlan.risks_and_challenges.map((risk, index) => (
                                            <li key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 bg-yellow-50/50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/50">
                                                <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                                                <span>{risk}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                /* Chat Mode */
                <div className="pro-card p-0 overflow-hidden h-[calc(100vh-200px)] flex flex-col bg-gray-50 dark:bg-gray-900">
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 mb-4">
                        {chatHistory.length === 0 && (
                            <div className="text-center py-20 text-gray-400 dark:text-gray-500">
                                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
                                    <Bot size={40} className="text-primary opacity-50" />
                                </div>
                                <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-2">How can I help you grow?</h3>
                                <p className="mb-8">Ask me anything about your CRM data, trends, or strategies.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                                    {[
                                        'What are my top performing lead sources?',
                                        'How can I improve my conversion rate?',
                                        'Which customers are at risk of churning?',
                                        'What should I focus on this week?',
                                    ].map((example) => (
                                        <button
                                            key={example}
                                            onClick={() => setQuestion(example)}
                                            className="px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary transition-all text-sm font-medium text-gray-600 dark:text-gray-300 shadow-sm text-left"
                                        >
                                            {example}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {chatHistory.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}
                            >
                                {msg.role === 'agent' && (
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                                        <Bot size={20} />
                                    </div>
                                )}
                                <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.role === 'user'
                                        ? 'bg-primary text-white rounded-tr-sm'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-tl-sm'
                                    }`}>
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                </div>
                                {msg.role === 'user' && (
                                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 text-gray-500 dark:text-gray-400">
                                        <User size={20} />
                                    </div>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                                    <Bot size={20} />
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-sm border border-gray-200 dark:border-gray-700 shadow-sm">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-100" />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex gap-3 max-w-4xl mx-auto">
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
                                placeholder="Message your AI Growth Agent..."
                                className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                disabled={loading}
                            />
                            <button
                                onClick={askQuestion}
                                disabled={loading || !question.trim()}
                                className="btn-primary px-6 rounded-xl flex items-center justify-center"
                                title="Send message"
                                aria-label="Send message"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
