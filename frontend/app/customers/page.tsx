'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Filter, Mail, Phone, Building, MoreVertical, Trash2 } from 'lucide-react';
import { customerApi, Customer } from '@/lib/api';
import { formatCurrency, formatDate, getStatusColor, getInitials } from '@/lib/utils';

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        loadCustomers();
    }, [statusFilter, search]);

    const loadCustomers = async () => {
        try {
            const response = await customerApi.getAll({
                status: statusFilter || undefined,
                search: search || undefined,
            });
            setCustomers(response.data);
        } catch (err) {
            console.error('Failed to load customers:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this customer?')) {
            try {
                await customerApi.delete(id);
                loadCustomers();
            } catch (err) {
                console.error('Failed to delete:', err);
            }
        }
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your customer relationships</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary"
                >
                    <Plus size={18} /> Add Customer
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-field pl-10 w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-800 transition-colors"
                    />
                </div>
                <div className="flex items-center gap-2 md:w-auto w-full">
                    <Filter className="text-gray-400" size={20} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="input-field cursor-pointer bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                        title="Filter by status"
                        aria-label="Filter by status"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="prospect">Prospect</option>
                        <option value="churned">Churned</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="spinner" />
                    </div>
                ) : customers.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                        <p>No customers found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wider">Customer</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wider">Company</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wider">Status</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wider">Lifetime Value</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wider">Source</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600 dark:text-gray-300 text-xs uppercase tracking-wider">Added</th>
                                    <th className="py-4 px-6"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {customers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors fade-in">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center font-bold text-white text-sm shadow-sm">
                                                    {getInitials(customer.name)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">{customer.name}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                        <Mail size={12} /> {customer.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                <Building size={16} className="text-gray-400" />
                                                <span>{customer.company || '-'}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`badge ${getStatusColor(customer.status) === 'badge-active' ? 'badge-success' : customer.status === 'churned' || customer.status === 'inactive' ? 'badge-error' : 'badge-neutral'}`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-bold text-gray-900 dark:text-white">
                                            {formatCurrency(customer.lifetime_value)}
                                        </td>
                                        <td className="py-4 px-6 text-gray-600 dark:text-gray-400">{customer.acquisition_source || '-'}</td>
                                        <td className="py-4 px-6 text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">{formatDate(customer.created_at)}</td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => handleDelete(customer.id)}
                                                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                                title="Delete Customer"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Stats Footer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="pro-card p-4 text-center">
                    <p className="text-2xl font-bold text-primary-500">{customers.length}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-1">Total Customers</p>
                </div>
                <div className="pro-card p-4 text-center">
                    <p className="text-2xl font-bold text-green-500">
                        {customers.filter(c => c.status === 'active').length}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-1">Active</p>
                </div>
                <div className="pro-card p-4 text-center">
                    <p className="text-2xl font-bold text-purple-500">
                        {formatCurrency(customers.reduce((sum, c) => sum + c.lifetime_value, 0))}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-1">Total LTV</p>
                </div>
                <div className="pro-card p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-500">
                        {formatCurrency(customers.length > 0 ? customers.reduce((sum, c) => sum + c.lifetime_value, 0) / customers.length : 0)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mt-1">Avg LTV</p>
                </div>
            </div>
        </div>
    );
}
