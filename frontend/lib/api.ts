import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Types
export interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    industry?: string;
    status: string;
    lifetime_value: number;
    acquisition_source?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface Lead {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    company?: string;
    job_title?: string;
    source?: string;
    status: string;
    score: number;
    estimated_value: number;
    notes?: string;
    created_at: string;
    updated_at: string;
    converted_at?: string;
    converted_to_customer_id?: number;
}

export interface Deal {
    id: number;
    title: string;
    description?: string;
    customer_id?: number;
    stage: string;
    value: number;
    probability: number;
    expected_close_date?: string;
    actual_close_date?: string;
    created_at: string;
    updated_at: string;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    customer_id?: number;
    priority: string;
    status: string;
    due_date?: string;
    completed_at?: string;
    assignee?: string;
    created_at: string;
    updated_at: string;
}

export interface AnalyticsOverview {
    total_customers: number;
    active_customers: number;
    churned_customers: number;
    retention_rate: number;
    total_leads: number;
    new_leads_30d: number;
    qualified_leads: number;
    lead_conversion_rate: number;
    avg_lead_score: number;
    best_lead_source: string;
    active_deals: number;
    pipeline_value: number;
    avg_deal_size: number;
    win_rate: number;
    deals_prospecting: number;
    deals_qualification: number;
    deals_proposal: number;
    deals_negotiation: number;
    total_revenue: number;
    mrr: number;
    avg_ltv: number;
    top_industry: string;
    top_acquisition_channel: string;
    open_tasks: number;
    overdue_tasks: number;
    completed_tasks_7d: number;
    active_campaigns: number;
    marketing_spend: number;
    marketing_leads: number;
    marketing_roi: number;
    interactions_30d: number;
    positive_interactions: number;
}

export interface GrowthPlan {
    timeframe: string;
    analysis_summary: string;
    key_insights: string[];
    action_items: Array<{
        title: string;
        priority: string;
        description: string;
    }>;
    predicted_outcomes: Record<string, string>;
    risks_and_challenges: string[];
    generated_at: string;
    full_response?: string;
}

// Customer APIs
export const customerApi = {
    getAll: (params?: { status?: string; industry?: string; search?: string }) =>
        api.get<Customer[]>('/customers', { params }),
    getById: (id: number) => api.get<Customer>(`/customers/${id}`),
    create: (data: Partial<Customer>) => api.post<Customer>('/customers', data),
    update: (id: number, data: Partial<Customer>) => api.put<Customer>(`/customers/${id}`, data),
    delete: (id: number) => api.delete(`/customers/${id}`),
};

// Lead APIs
export const leadApi = {
    getAll: (params?: { status?: string; source?: string; min_score?: number }) =>
        api.get<Lead[]>('/leads', { params }),
    getById: (id: number) => api.get<Lead>(`/leads/${id}`),
    create: (data: Partial<Lead>) => api.post<Lead>('/leads', data),
    update: (id: number, data: Partial<Lead>) => api.put<Lead>(`/leads/${id}`, data),
    delete: (id: number) => api.delete(`/leads/${id}`),
    convert: (id: number) => api.post(`/leads/${id}/convert`),
};

// Deal APIs
export const dealApi = {
    getAll: (params?: { stage?: string; customer_id?: number; min_value?: number }) =>
        api.get<Deal[]>('/deals', { params }),
    getById: (id: number) => api.get<Deal>(`/deals/${id}`),
    getPipeline: () => api.get('/deals/pipeline'),
    create: (data: Partial<Deal>) => api.post<Deal>('/deals', data),
    update: (id: number, data: Partial<Deal>) => api.put<Deal>(`/deals/${id}`, data),
    updateStage: (id: number, stage: string) => api.put(`/deals/${id}/stage?stage=${stage}`),
    delete: (id: number) => api.delete(`/deals/${id}`),
};

// Task APIs
export const taskApi = {
    getAll: (params?: { status?: string; priority?: string; assignee?: string; overdue_only?: boolean }) =>
        api.get<Task[]>('/tasks', { params }),
    getById: (id: number) => api.get<Task>(`/tasks/${id}`),
    getSummary: () => api.get('/tasks/summary'),
    create: (data: Partial<Task>) => api.post<Task>('/tasks', data),
    update: (id: number, data: Partial<Task>) => api.put<Task>(`/tasks/${id}`, data),
    complete: (id: number) => api.put(`/tasks/${id}/complete`),
    delete: (id: number) => api.delete(`/tasks/${id}`),
};

// Analytics APIs
export const analyticsApi = {
    getOverview: () => api.get<AnalyticsOverview>('/analytics/overview'),
    getRevenueChart: () => api.get('/analytics/revenue-chart'),
    getLeadSources: () => api.get('/analytics/lead-sources'),
    getCustomerIndustries: () => api.get('/analytics/customer-industries'),
    getGrowthPlan: (timeframe: string, focus_area?: string) =>
        api.post<GrowthPlan>('/analytics/growth-plan', { timeframe, focus_area }),
    askAgent: (question: string) =>
        api.post<{ question: string; answer: string }>('/analytics/ask', null, { params: { question } }),
};

export default api;
