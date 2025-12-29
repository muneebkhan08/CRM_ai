'use client';

import { useEffect, useState } from 'react';
import { Plus, CheckCircle, Clock, AlertTriangle, Calendar, User, Search, Filter } from 'lucide-react';
import { taskApi, Task } from '@/lib/api';
import { formatDate, getStatusColor, getPriorityIcon } from '@/lib/utils';

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [summary, setSummary] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, [statusFilter, priorityFilter]);

    const loadData = async () => {
        try {
            const [tasksRes, summaryRes] = await Promise.all([
                taskApi.getAll({
                    status: statusFilter || undefined,
                    priority: priorityFilter || undefined,
                }),
                taskApi.getSummary(),
            ]);
            setTasks(tasksRes.data);
            setSummary(summaryRes.data);
        } catch (err) {
            console.error('Failed to load tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async (id: number) => {
        try {
            await taskApi.complete(id);
            loadData();
        } catch (err) {
            console.error('Failed to complete task:', err);
        }
    };

    const isOverdue = (task: Task) => {
        if (!task.due_date || task.status === 'completed' || task.status === 'cancelled') return false;
        return new Date(task.due_date) < new Date();
    };

    const groupedTasks = {
        overdue: tasks.filter(t => isOverdue(t)),
        today: tasks.filter(t => {
            if (!t.due_date || isOverdue(t) || t.status === 'completed') return false;
            const today = new Date();
            const dueDate = new Date(t.due_date);
            return dueDate.toDateString() === today.toDateString();
        }),
        upcoming: tasks.filter(t => {
            if (!t.due_date || isOverdue(t) || t.status === 'completed') return false;
            const today = new Date();
            const dueDate = new Date(t.due_date);
            return dueDate > today && dueDate.toDateString() !== today.toDateString();
        }),
        completed: tasks.filter(t => t.status === 'completed'),
        noDueDate: tasks.filter(t => !t.due_date && t.status !== 'completed'),
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your team's activities</p>
                </div>
                <button className="btn-primary">
                    <Plus size={18} /> New Task
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="pro-card p-4 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-900/30">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary?.by_status?.todo || 0}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">To Do</p>
                    </div>
                </div>
                <div className="pro-card p-4 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary?.by_status?.in_progress || 0}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">In Progress</p>
                    </div>
                </div>
                <div className="pro-card p-4 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">{summary?.overdue || 0}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Overdue</p>
                    </div>
                </div>
                <div className="pro-card p-4 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{summary?.by_status?.completed || 0}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Completed</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                    <Filter size={20} />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Filters:</span>
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="input-field cursor-pointer md:w-auto w-full"
                    title="Filter by status"
                    aria-label="Filter by status"
                >
                    <option value="">All Status</option>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="input-field cursor-pointer md:w-auto w-full"
                    title="Filter by priority"
                    aria-label="Filter by priority"
                >
                    <option value="">All Priority</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>

            {/* Task Sections */}
            <div className="space-y-8">
                {/* Overdue */}
                {groupedTasks.overdue.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                            <AlertTriangle size={20} /> Overdue ({groupedTasks.overdue.length})
                        </h2>
                        <div className="space-y-3">
                            {groupedTasks.overdue.map((task) => (
                                <TaskCard key={task.id} task={task} onComplete={handleComplete} isOverdue />
                            ))}
                        </div>
                    </div>
                )}

                {/* Today */}
                {groupedTasks.today.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Clock size={20} className="text-yellow-500" /> Due Today ({groupedTasks.today.length})
                        </h2>
                        <div className="space-y-3">
                            {groupedTasks.today.map((task) => (
                                <TaskCard key={task.id} task={task} onComplete={handleComplete} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Upcoming */}
                {groupedTasks.upcoming.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Calendar size={20} className="text-primary" /> Upcoming ({groupedTasks.upcoming.length})
                        </h2>
                        <div className="space-y-3">
                            {groupedTasks.upcoming.map((task) => (
                                <TaskCard key={task.id} task={task} onComplete={handleComplete} />
                            ))}
                        </div>
                    </div>
                )}

                {/* No Due Date */}
                {groupedTasks.noDueDate.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            No Due Date ({groupedTasks.noDueDate.length})
                        </h2>
                        <div className="space-y-3">
                            {groupedTasks.noDueDate.map((task) => (
                                <TaskCard key={task.id} task={task} onComplete={handleComplete} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Completed */}
                {groupedTasks.completed.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
                            <CheckCircle size={20} /> Completed ({groupedTasks.completed.length})
                        </h2>
                        <div className="space-y-3 opacity-75">
                            {groupedTasks.completed.slice(0, 5).map((task) => (
                                <TaskCard key={task.id} task={task} onComplete={handleComplete} completed />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function TaskCard({
    task,
    onComplete,
    isOverdue = false,
    completed = false
}: {
    task: Task;
    onComplete: (id: number) => void;
    isOverdue?: boolean;
    completed?: boolean;
}) {
    return (
        <div className={`pro-card p-4 flex items-center gap-4 transition-all hover:shadow-md ${isOverdue ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-transparent'}`}>
            <button
                onClick={() => !completed && onComplete(task.id)}
                disabled={completed}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${completed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary text-transparent hover:text-primary-100'
                    }`}
            >
                {completed && <CheckCircle size={14} className="text-white" />}
            </button>

            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="text-lg">{getPriorityIcon(task.priority)}</span>
                    <h3 className={`font-semibold text-gray-900 dark:text-white ${completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                        {task.title}
                    </h3>
                </div>
                {task.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{task.description}</p>
                )}
            </div>

            <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-4 text-sm">
                {task.assignee && (
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-md">
                        <User size={14} />
                        <span>{task.assignee}</span>
                    </div>
                )}
                {task.due_date && (
                    <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-500 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                        <Calendar size={14} />
                        <span>{formatDate(task.due_date)}</span>
                    </div>
                )}
                <span className={`badge ${getStatusColor(task.priority) === 'badge-active' ? 'badge-warning' : 'badge-neutral'}`}>
                    {task.priority}
                </span>
            </div>
        </div>
    );
}
