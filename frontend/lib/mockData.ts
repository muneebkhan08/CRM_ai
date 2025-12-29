// Mock data for demo mode when backend is unavailable

export const mockAnalyticsOverview = {
    total_customers: 50,
    active_customers: 42,
    churned_customers: 3,
    total_leads: 80,
    qualified_leads: 28,
    new_leads_30d: 15,
    active_deals: 53,
    pipeline_value: 7351475,
    total_revenue: 1773961,
    mrr: 67096,
    avg_deal_size: 142001,
    avg_ltv: 35479,
    lead_conversion_rate: 5.0,
    win_rate: 57.1,
    retention_rate: 84.0,
    marketing_roi: 320,
    deals_prospecting: 9,
    deals_qualification: 16,
    deals_proposal: 16,
    deals_negotiation: 12,
    open_tasks: 70,
    overdue_tasks: 14,
    completed_tasks_7d: 8,
    best_lead_source: 'LinkedIn',
    top_industry: 'Technology',
    top_acquisition_channel: 'Referral',
};

export const mockCustomers = [
    { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', company: 'Acme Corp', status: 'active', lifetime_value: 125000, acquisition_source: 'Referral', created_at: '2024-01-15' },
    { id: 2, name: 'TechStart Inc', email: 'hello@techstart.io', company: 'TechStart', status: 'active', lifetime_value: 89000, acquisition_source: 'LinkedIn', created_at: '2024-02-20' },
    { id: 3, name: 'Global Systems', email: 'info@globalsys.com', company: 'Global Systems', status: 'active', lifetime_value: 210000, acquisition_source: 'Website', created_at: '2024-01-08' },
    { id: 4, name: 'DataFlow Labs', email: 'team@dataflow.dev', company: 'DataFlow', status: 'prospect', lifetime_value: 45000, acquisition_source: 'Conference', created_at: '2024-03-01' },
    { id: 5, name: 'CloudNine Solutions', email: 'sales@cloudnine.io', company: 'CloudNine', status: 'active', lifetime_value: 178000, acquisition_source: 'Referral', created_at: '2024-01-22' },
];

export const mockLeads = [
    { id: 1, name: 'John Smith', email: 'john@example.com', company: 'ABC Corp', job_title: 'CTO', status: 'qualified', score: 85, estimated_value: 75000, source: 'LinkedIn', created_at: '2024-03-10' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@startup.io', company: 'StartupXYZ', job_title: 'CEO', status: 'new', score: 65, estimated_value: 50000, source: 'Website', created_at: '2024-03-12' },
    { id: 3, name: 'Mike Wilson', email: 'mike@enterprise.com', company: 'Enterprise Ltd', job_title: 'VP Sales', status: 'contacted', score: 72, estimated_value: 120000, source: 'Referral', created_at: '2024-03-08' },
    { id: 4, name: 'Emily Brown', email: 'emily@techfirm.co', company: 'TechFirm', job_title: 'Director', status: 'proposal', score: 90, estimated_value: 95000, source: 'Conference', created_at: '2024-02-28' },
    { id: 5, name: 'David Lee', email: 'david@growth.io', company: 'GrowthCo', job_title: 'Founder', status: 'won', score: 95, estimated_value: 85000, source: 'LinkedIn', created_at: '2024-02-15' },
];

export const mockDeals = [
    { id: 1, title: 'Enterprise Software License', value: 150000, stage: 'negotiation', probability: 75, customer_id: 1, expected_close_date: '2024-04-15', created_at: '2024-02-01' },
    { id: 2, title: 'Cloud Migration Project', value: 280000, stage: 'proposal', probability: 50, customer_id: 2, expected_close_date: '2024-05-01', created_at: '2024-02-15' },
    { id: 3, title: 'Annual Support Contract', value: 45000, stage: 'qualification', probability: 30, customer_id: 3, expected_close_date: '2024-04-30', created_at: '2024-03-01' },
    { id: 4, title: 'Custom Integration', value: 95000, stage: 'prospecting', probability: 20, customer_id: 4, expected_close_date: '2024-06-15', created_at: '2024-03-10' },
    { id: 5, title: 'Platform Upgrade', value: 120000, stage: 'closed_won', probability: 100, customer_id: 5, expected_close_date: '2024-03-01', created_at: '2024-01-20' },
];

export const mockTasks = [
    { id: 1, title: 'Follow up with Acme Corp', description: 'Schedule demo call', status: 'todo', priority: 'high', due_date: '2024-03-20', assignee: 'John', created_at: '2024-03-10' },
    { id: 2, title: 'Prepare proposal for TechStart', description: 'Include pricing options', status: 'in_progress', priority: 'urgent', due_date: '2024-03-18', assignee: 'Sarah', created_at: '2024-03-12' },
    { id: 3, title: 'Review contract terms', description: 'Legal review needed', status: 'todo', priority: 'medium', due_date: '2024-03-25', assignee: 'Mike', created_at: '2024-03-14' },
    { id: 4, title: 'Send onboarding materials', description: 'New customer setup', status: 'completed', priority: 'low', due_date: '2024-03-15', assignee: 'Emily', created_at: '2024-03-10' },
    { id: 5, title: 'Quarterly review meeting', description: 'Prepare slides', status: 'todo', priority: 'high', due_date: '2024-03-22', assignee: 'David', created_at: '2024-03-08' },
];

export const mockRevenueChart = [
    { month: 'Jan', revenue: 125000 },
    { month: 'Feb', revenue: 148000 },
    { month: 'Mar', revenue: 162000 },
    { month: 'Apr', revenue: 185000 },
    { month: 'May', revenue: 210000 },
    { month: 'Jun', revenue: 195000 },
];

export const mockLeadSources = [
    { source: 'LinkedIn', count: 25 },
    { source: 'Website', count: 20 },
    { source: 'Referral', count: 18 },
    { source: 'Conference', count: 10 },
    { source: 'Cold Email', count: 7 },
];

export const mockIndustries = [
    { industry: 'Technology', count: 18 },
    { industry: 'Healthcare', count: 12 },
    { industry: 'Finance', count: 10 },
    { industry: 'Manufacturing', count: 6 },
    { industry: 'Retail', count: 4 },
];

export const mockGrowthPlan = {
    timeframe: 'week',
    analysis_summary: 'Based on your CRM data, your business shows strong growth potential with a 57.1% win rate and healthy pipeline value of $7.35M. Focus on converting qualified leads and reducing task overdue rate.',
    key_insights: [
        'Lead conversion rate of 5% indicates room for improvement in qualification process',
        'High win rate (57.1%) suggests strong sales execution once deals reach negotiation',
        '14 overdue tasks may be impacting deal velocity',
        'LinkedIn is your best performing lead source',
        'Technology sector represents your largest customer segment'
    ],
    action_items: [
        { title: 'Clear overdue tasks', priority: 'high', description: 'Address 14 overdue tasks to improve deal velocity' },
        { title: 'Focus on LinkedIn campaigns', priority: 'high', description: 'Double down on LinkedIn as your best lead source' },
        { title: 'Implement lead scoring automation', priority: 'medium', description: 'Automate lead scoring to improve conversion rates' },
        { title: 'Schedule quarterly business reviews', priority: 'medium', description: 'Regular reviews with key accounts to prevent churn' },
    ],
    risks_and_challenges: [
        'Task backlog may delay deal closures',
        'Heavy reliance on single lead source (LinkedIn)',
        'Need to diversify industry portfolio beyond Technology'
    ],
    generated_at: new Date().toISOString(),
};

export const mockPipeline = [
    { stage: 'prospecting', count: 9, value: 450000 },
    { stage: 'qualification', count: 16, value: 1200000 },
    { stage: 'proposal', count: 16, value: 2800000 },
    { stage: 'negotiation', count: 12, value: 2900000 },
];

export const mockTaskSummary = {
    total: 100,
    by_status: { todo: 45, in_progress: 25, completed: 30 },
    by_priority: { urgent: 10, high: 25, medium: 40, low: 25 },
    overdue: 14,
};
