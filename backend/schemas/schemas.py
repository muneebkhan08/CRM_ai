from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# Customer Schemas
class CustomerBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    industry: Optional[str] = None
    status: Optional[str] = "active"
    acquisition_source: Optional[str] = None
    notes: Optional[str] = None


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    industry: Optional[str] = None
    status: Optional[str] = None
    acquisition_source: Optional[str] = None
    notes: Optional[str] = None


class CustomerResponse(CustomerBase):
    id: int
    lifetime_value: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Lead Schemas
class LeadBase(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = None
    source: Optional[str] = None
    status: Optional[str] = "new"
    score: Optional[int] = 0
    estimated_value: Optional[float] = 0.0
    notes: Optional[str] = None


class LeadCreate(LeadBase):
    pass


class LeadUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = None
    source: Optional[str] = None
    status: Optional[str] = None
    score: Optional[int] = None
    estimated_value: Optional[float] = None
    notes: Optional[str] = None


class LeadResponse(LeadBase):
    id: int
    created_at: datetime
    updated_at: datetime
    converted_at: Optional[datetime] = None
    converted_to_customer_id: Optional[int] = None

    class Config:
        from_attributes = True


# Deal Schemas
class DealBase(BaseModel):
    title: str
    description: Optional[str] = None
    customer_id: Optional[int] = None
    stage: Optional[str] = "prospecting"
    value: Optional[float] = 0.0
    probability: Optional[int] = 10
    expected_close_date: Optional[datetime] = None


class DealCreate(DealBase):
    pass


class DealUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    customer_id: Optional[int] = None
    stage: Optional[str] = None
    value: Optional[float] = None
    probability: Optional[int] = None
    expected_close_date: Optional[datetime] = None


class DealResponse(DealBase):
    id: int
    actual_close_date: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Task Schemas
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    customer_id: Optional[int] = None
    priority: Optional[str] = "medium"
    status: Optional[str] = "todo"
    due_date: Optional[datetime] = None
    assignee: Optional[str] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    customer_id: Optional[int] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[datetime] = None
    assignee: Optional[str] = None


class TaskResponse(TaskBase):
    id: int
    completed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Interaction Schemas
class InteractionBase(BaseModel):
    customer_id: int
    type: str
    subject: Optional[str] = None
    notes: Optional[str] = None
    outcome: Optional[str] = None
    duration_minutes: Optional[int] = 0


class InteractionCreate(InteractionBase):
    pass


class InteractionResponse(InteractionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Revenue Schemas
class RevenueBase(BaseModel):
    customer_id: int
    amount: float
    type: str
    description: Optional[str] = None
    date: Optional[datetime] = None


class RevenueCreate(RevenueBase):
    pass


class RevenueResponse(RevenueBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Marketing Campaign Schemas
class CampaignBase(BaseModel):
    name: str
    channel: Optional[str] = None
    status: Optional[str] = "draft"
    budget: Optional[float] = 0.0
    spent: Optional[float] = 0.0
    leads_generated: Optional[int] = 0
    conversions: Optional[int] = 0
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None


class CampaignCreate(CampaignBase):
    pass


class CampaignResponse(CampaignBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Analytics Schemas
class AnalyticsOverview(BaseModel):
    total_customers: int
    active_customers: int
    total_leads: int
    qualified_leads: int
    total_deals: int
    deals_in_pipeline: int
    total_revenue: float
    monthly_revenue: float
    conversion_rate: float
    average_deal_value: float


class GrowthPlanRequest(BaseModel):
    timeframe: str  # day, week, month, quarter, year
    focus_area: Optional[str] = None  # sales, marketing, retention, all


class GrowthPlanResponse(BaseModel):
    timeframe: str
    analysis_summary: str
    key_insights: list[str]
    action_items: list[dict]
    predicted_outcomes: dict
    risks_and_challenges: list[str]
    generated_at: datetime
