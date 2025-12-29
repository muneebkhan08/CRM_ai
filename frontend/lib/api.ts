import axios from 'axios';
import {
    mockAnalyticsOverview,
    mockCustomers,
    mockLeads,
    mockDeals,
    mockTasks,
    mockRevenueChart,
    mockLeadSources,
    mockIndustries,
    mockGrowthPlan,
    mockPipeline,
    mockTaskSummary,
} from './mockData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Demo mode flag - set to true when backend is unavailable
let isDemoMode = false;

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000, // 5 second timeout
});

// Check if we should use demo mode
const checkDemoMode = async () => {
    try {
        await axios.get(`${API_URL}/api/analytics/overview`, { timeout: 3000 });
        isDemoMode = false;
    } catch {
        isDemoMode = true;
    }
};

// Initialize demo mode check
if (typeof window !== 'undefined') {
    checkDemoMode();
}

// Helper to create mock response
const mockResponse = <T>(data: T) => ({ data });

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
    updated_at?: string;
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
    updated_at?: string;
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
    updated_at?: string;
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
    updated_at?: string;
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
    avg_lead_score?: number;
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
    active_campaigns?: number;
    marketing_spend?: number;
    marketing_leads?: number;
    marketing_roi?: number;
    interactions_30d?: number;
    positive_interactions?: number;
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
    predicted_outcomes?: Record<string, string>;
    risks_and_challenges: string[];
    generated_at: string;
    full_response?: string;
}

// Customer APIs with demo fallback
export const customerApi = {
    getAll: async (params?: { status?: string; industry?: string; search?: string }) => {
        try {
            return await api.get<Customer[]>('/customers', { params });
        } catch {
            return mockResponse(mockCustomers as Customer[]);
        }
    },
    getById: (id: number) => api.get<Customer>(`/customers/${id}`),
    create: (data: Partial<Customer>) => api.post<Customer>('/customers', data),
    update: (id: number, data: Partial<Customer>) => api.put<Customer>(`/customers/${id}`, data),
    delete: (id: number) => api.delete(`/customers/${id}`),
};

// Lead APIs with demo fallback
export const leadApi = {
    getAll: async (params?: { status?: string; source?: string; min_score?: number }) => {
        try {
            return await api.get<Lead[]>('/leads', { params });
        } catch {
            return mockResponse(mockLeads as Lead[]);
        }
    },
    getById: (id: number) => api.get<Lead>(`/leads/${id}`),
    create: (data: Partial<Lead>) => api.post<Lead>('/leads', data),
    update: (id: number, data: Partial<Lead>) => api.put<Lead>(`/leads/${id}`, data),
    delete: (id: number) => api.delete(`/leads/${id}`),
    convert: (id: number) => api.post(`/leads/${id}/convert`),
};

// Deal APIs with demo fallback
export const dealApi = {
    getAll: async (params?: { stage?: string; customer_id?: number; min_value?: number }) => {
        try {
            return await api.get<Deal[]>('/deals', { params });
        } catch {
            return mockResponse(mockDeals as Deal[]);
        }
    },
    getById: (id: number) => api.get<Deal>(`/deals/${id}`),
    getPipeline: async () => {
        try {
            return await api.get('/deals/pipeline');
        } catch {
            return mockResponse(mockPipeline);
        }
    },
    create: (data: Partial<Deal>) => api.post<Deal>('/deals', data),
    update: (id: number, data: Partial<Deal>) => api.put<Deal>(`/deals/${id}`, data),
    updateStage: (id: number, stage: string) => api.put(`/deals/${id}/stage?stage=${stage}`),
    delete: (id: number) => api.delete(`/deals/${id}`),
};

// Task APIs with demo fallback
export const taskApi = {
    getAll: async (params?: { status?: string; priority?: string; assignee?: string; overdue_only?: boolean }) => {
        try {
            return await api.get<Task[]>('/tasks', { params });
        } catch {
            return mockResponse(mockTasks as Task[]);
        }
    },
    getById: (id: number) => api.get<Task>(`/tasks/${id}`),
    getSummary: async () => {
        try {
            return await api.get('/tasks/summary');
        } catch {
            return mockResponse(mockTaskSummary);
        }
    },
    create: (data: Partial<Task>) => api.post<Task>('/tasks', data),
    update: (id: number, data: Partial<Task>) => api.put<Task>(`/tasks/${id}`, data),
    complete: (id: number) => api.put(`/tasks/${id}/complete`),
    delete: (id: number) => api.delete(`/tasks/${id}`),
};

// Analytics APIs with demo fallback
export const analyticsApi = {
    getOverview: async () => {
        try {
            return await api.get<AnalyticsOverview>('/analytics/overview');
        } catch {
            return mockResponse(mockAnalyticsOverview as AnalyticsOverview);
        }
    },
    getRevenueChart: async () => {
        try {
            return await api.get('/analytics/revenue-chart');
        } catch {
            return mockResponse(mockRevenueChart);
        }
    },
    getLeadSources: async () => {
        try {
            return await api.get('/analytics/lead-sources');
        } catch {
            return mockResponse(mockLeadSources);
        }
    },
    getCustomerIndustries: async () => {
        try {
            return await api.get('/analytics/customer-industries');
        } catch {
            return mockResponse(mockIndustries);
        }
    },
    getGrowthPlan: async (timeframe: string, focus_area?: string) => {
        try {
            return await api.post<GrowthPlan>('/analytics/growth-plan', { timeframe, focus_area });
        } catch {
            return mockResponse({ ...mockGrowthPlan, timeframe } as GrowthPlan);
        }
    },
    askAgent: async (question: string) => {
        try {
            return await api.post<{ question: string; answer: string }>('/analytics/ask', null, { params: { question } });
        } catch {
            return mockResponse({
                question,
                answer: `This is a demo response. In production with a connected backend, the AI agent would analyze your CRM data to answer: "${question}"\n\nBased on the demo data:\n- You have 50 customers with 42 active\n- 80 leads in the pipeline valued at $7.35M\n- Win rate is 57.1%\n- Best lead source is LinkedIn`
            });
        }
    },
};

export default api;
