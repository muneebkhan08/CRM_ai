"""
Fake/Mock data for the CRM application
Replaces database integration with local static data
"""
from datetime import datetime, timedelta
import random

# Generate dates
now = datetime.utcnow()

# Fake Customers Data
CUSTOMERS = [
    {"id": 1, "name": "John Smith", "email": "john.smith@techcorp.com", "phone": "+1-555-0101", "company": "TechCorp Inc", "status": "active", "industry": "Technology", "lifetime_value": 125000.00, "acquisition_source": "referral", "notes": "Key enterprise client", "created_at": now - timedelta(days=365), "updated_at": now - timedelta(days=30)},
    {"id": 2, "name": "Sarah Johnson", "email": "sarah.j@healthplus.com", "phone": "+1-555-0102", "company": "HealthPlus", "status": "active", "industry": "Healthcare", "lifetime_value": 89000.00, "acquisition_source": "website", "notes": "Growing account", "created_at": now - timedelta(days=300), "updated_at": now - timedelta(days=15)},
    {"id": 3, "name": "Mike Davis", "email": "mike.davis@finserv.com", "phone": "+1-555-0103", "company": "FinServ Solutions", "status": "active", "industry": "Finance", "lifetime_value": 210000.00, "acquisition_source": "conference", "notes": "Premium tier client", "created_at": now - timedelta(days=450), "updated_at": now - timedelta(days=7)},
    {"id": 4, "name": "Emily Brown", "email": "emily.b@retailmax.com", "phone": "+1-555-0104", "company": "RetailMax", "status": "active", "industry": "Retail", "lifetime_value": 67000.00, "acquisition_source": "advertising", "notes": "Expanding services", "created_at": now - timedelta(days=200), "updated_at": now - timedelta(days=45)},
    {"id": 5, "name": "David Wilson", "email": "d.wilson@manufact.com", "phone": "+1-555-0105", "company": "ManufactPro", "status": "churned", "industry": "Manufacturing", "lifetime_value": 45000.00, "acquisition_source": "referral", "notes": "Lost to competitor", "created_at": now - timedelta(days=500), "updated_at": now - timedelta(days=60)},
    {"id": 6, "name": "Lisa Anderson", "email": "lisa.a@edulearn.com", "phone": "+1-555-0106", "company": "EduLearn", "status": "active", "industry": "Education", "lifetime_value": 78000.00, "acquisition_source": "website", "notes": "Annual contract", "created_at": now - timedelta(days=180), "updated_at": now - timedelta(days=10)},
    {"id": 7, "name": "James Taylor", "email": "j.taylor@logistix.com", "phone": "+1-555-0107", "company": "Logistix", "status": "active", "industry": "Logistics", "lifetime_value": 156000.00, "acquisition_source": "cold_call", "notes": "Multi-year deal", "created_at": now - timedelta(days=400), "updated_at": now - timedelta(days=5)},
    {"id": 8, "name": "Jennifer Martinez", "email": "jen.m@mediagroup.com", "phone": "+1-555-0108", "company": "MediaGroup", "status": "inactive", "industry": "Media", "lifetime_value": 34000.00, "acquisition_source": "advertising", "notes": "Paused services", "created_at": now - timedelta(days=250), "updated_at": now - timedelta(days=90)},
    {"id": 9, "name": "Robert Garcia", "email": "r.garcia@energyco.com", "phone": "+1-555-0109", "company": "EnergyCo", "status": "active", "industry": "Energy", "lifetime_value": 289000.00, "acquisition_source": "conference", "notes": "Strategic partner", "created_at": now - timedelta(days=600), "updated_at": now - timedelta(days=3)},
    {"id": 10, "name": "Amanda Lee", "email": "amanda.lee@foodserv.com", "phone": "+1-555-0110", "company": "FoodServ", "status": "active", "industry": "Food & Beverage", "lifetime_value": 92000.00, "acquisition_source": "referral", "notes": "Expansion planned", "created_at": now - timedelta(days=150), "updated_at": now - timedelta(days=20)},
]

# Fake Leads Data
LEADS = [
    {"id": 1, "name": "Chris Parker", "email": "c.parker@startup.io", "phone": "+1-555-0201", "company": "StartupIO", "status": "new", "source": "website", "score": 85, "notes": "Interested in enterprise plan", "created_at": now - timedelta(days=5), "updated_at": now - timedelta(days=1)},
    {"id": 2, "name": "Nancy White", "email": "n.white@bigretail.com", "phone": "+1-555-0202", "company": "BigRetail", "status": "qualified", "source": "referral", "score": 92, "notes": "Budget approved", "created_at": now - timedelta(days=10), "updated_at": now - timedelta(days=2)},
    {"id": 3, "name": "Tom Harris", "email": "tom.h@cloudtech.com", "phone": "+1-555-0203", "company": "CloudTech", "status": "contacted", "source": "linkedin", "score": 78, "notes": "Scheduled demo", "created_at": now - timedelta(days=7), "updated_at": now - timedelta(days=3)},
    {"id": 4, "name": "Rachel Green", "email": "r.green@designstudio.com", "phone": "+1-555-0204", "company": "DesignStudio", "status": "new", "source": "advertising", "score": 65, "notes": "Small team, growing fast", "created_at": now - timedelta(days=2), "updated_at": now - timedelta(days=1)},
    {"id": 5, "name": "Kevin Moore", "email": "k.moore@lawfirm.com", "phone": "+1-555-0205", "company": "Moore & Associates", "status": "qualified", "source": "conference", "score": 88, "notes": "Need compliance features", "created_at": now - timedelta(days=15), "updated_at": now - timedelta(days=4)},
    {"id": 6, "name": "Diana Ross", "email": "diana.r@pharma.com", "phone": "+1-555-0206", "company": "PharmaCare", "status": "won", "source": "referral", "score": 95, "notes": "Converted to customer", "created_at": now - timedelta(days=45), "updated_at": now - timedelta(days=10)},
    {"id": 7, "name": "Brian Clark", "email": "b.clark@construction.com", "phone": "+1-555-0207", "company": "BuildRight", "status": "lost", "source": "cold_call", "score": 45, "notes": "Chose competitor", "created_at": now - timedelta(days=30), "updated_at": now - timedelta(days=8)},
    {"id": 8, "name": "Samantha Hill", "email": "s.hill@insurance.com", "phone": "+1-555-0208", "company": "SafeInsure", "status": "contacted", "source": "website", "score": 72, "notes": "Following up next week", "created_at": now - timedelta(days=8), "updated_at": now - timedelta(days=2)},
    {"id": 9, "name": "Mark Thompson", "email": "m.thompson@autoparts.com", "phone": "+1-555-0209", "company": "AutoParts Plus", "status": "new", "source": "advertising", "score": 58, "notes": "Initial inquiry", "created_at": now - timedelta(days=1), "updated_at": now - timedelta(hours=12)},
    {"id": 10, "name": "Laura King", "email": "l.king@consulting.com", "phone": "+1-555-0210", "company": "KingConsult", "status": "qualified", "source": "linkedin", "score": 90, "notes": "High priority prospect", "created_at": now - timedelta(days=12), "updated_at": now - timedelta(days=1)},
]

# Fake Deals Data
DEALS = [
    {"id": 1, "title": "TechCorp Enterprise License", "value": 150000.00, "stage": "negotiation", "probability": 80, "customer_id": 1, "expected_close": now + timedelta(days=15), "notes": "Final contract review", "created_at": now - timedelta(days=60), "updated_at": now - timedelta(days=2)},
    {"id": 2, "title": "HealthPlus Expansion", "value": 75000.00, "stage": "proposal", "probability": 60, "customer_id": 2, "expected_close": now + timedelta(days=30), "notes": "Waiting for budget approval", "created_at": now - timedelta(days=30), "updated_at": now - timedelta(days=5)},
    {"id": 3, "title": "FinServ Premium Upgrade", "value": 200000.00, "stage": "closed_won", "probability": 100, "customer_id": 3, "expected_close": now - timedelta(days=10), "notes": "Deal closed successfully", "created_at": now - timedelta(days=90), "updated_at": now - timedelta(days=10)},
    {"id": 4, "title": "RetailMax Integration", "value": 45000.00, "stage": "qualification", "probability": 40, "customer_id": 4, "expected_close": now + timedelta(days=60), "notes": "Evaluating requirements", "created_at": now - timedelta(days=20), "updated_at": now - timedelta(days=3)},
    {"id": 5, "title": "EduLearn Annual Renewal", "value": 85000.00, "stage": "prospecting", "probability": 30, "customer_id": 6, "expected_close": now + timedelta(days=90), "notes": "Initial discussions", "created_at": now - timedelta(days=10), "updated_at": now - timedelta(days=1)},
    {"id": 6, "title": "Logistix Fleet Management", "value": 180000.00, "stage": "proposal", "probability": 70, "customer_id": 7, "expected_close": now + timedelta(days=25), "notes": "Proposal submitted", "created_at": now - timedelta(days=45), "updated_at": now - timedelta(days=4)},
    {"id": 7, "title": "EnergyCo Analytics Suite", "value": 320000.00, "stage": "negotiation", "probability": 85, "customer_id": 9, "expected_close": now + timedelta(days=10), "notes": "Final pricing discussion", "created_at": now - timedelta(days=75), "updated_at": now - timedelta(days=1)},
    {"id": 8, "title": "FoodServ POS Integration", "value": 55000.00, "stage": "qualification", "probability": 50, "customer_id": 10, "expected_close": now + timedelta(days=45), "notes": "Technical review ongoing", "created_at": now - timedelta(days=15), "updated_at": now - timedelta(days=6)},
    {"id": 9, "title": "StartupIO Basic Plan", "value": 25000.00, "stage": "prospecting", "probability": 25, "customer_id": None, "expected_close": now + timedelta(days=120), "notes": "New lead conversion", "created_at": now - timedelta(days=5), "updated_at": now - timedelta(days=2)},
    {"id": 10, "title": "BigRetail Enterprise", "value": 290000.00, "stage": "closed_lost", "probability": 0, "customer_id": None, "expected_close": now - timedelta(days=5), "notes": "Lost to competitor pricing", "created_at": now - timedelta(days=100), "updated_at": now - timedelta(days=5)},
]

# Fake Tasks Data
TASKS = [
    {"id": 1, "title": "Follow up with TechCorp", "description": "Schedule final contract review meeting", "status": "in_progress", "priority": "high", "assignee": "Sales Team", "due_date": now + timedelta(days=2), "customer_id": 1, "deal_id": 1, "completed_at": None, "created_at": now - timedelta(days=5), "updated_at": now - timedelta(days=1)},
    {"id": 2, "title": "Send proposal to HealthPlus", "description": "Prepare and send updated proposal", "status": "todo", "priority": "high", "assignee": "Sales Team", "due_date": now + timedelta(days=3), "customer_id": 2, "deal_id": 2, "completed_at": None, "created_at": now - timedelta(days=3), "updated_at": now - timedelta(days=1)},
    {"id": 3, "title": "Demo for CloudTech", "description": "Product demonstration for new lead", "status": "todo", "priority": "medium", "assignee": "Product Team", "due_date": now + timedelta(days=5), "customer_id": None, "deal_id": None, "completed_at": None, "created_at": now - timedelta(days=2), "updated_at": now - timedelta(days=1)},
    {"id": 4, "title": "Contract renewal reminder", "description": "Contact EduLearn about upcoming renewal", "status": "todo", "priority": "medium", "assignee": "Account Manager", "due_date": now + timedelta(days=7), "customer_id": 6, "deal_id": 5, "completed_at": None, "created_at": now - timedelta(days=10), "updated_at": now - timedelta(days=2)},
    {"id": 5, "title": "Quarterly review - EnergyCo", "description": "Prepare quarterly business review presentation", "status": "in_progress", "priority": "high", "assignee": "Account Manager", "due_date": now + timedelta(days=1), "customer_id": 9, "deal_id": 7, "completed_at": None, "created_at": now - timedelta(days=14), "updated_at": now - timedelta(hours=6)},
    {"id": 6, "title": "Update CRM records", "description": "Update all customer contact information", "status": "completed", "priority": "low", "assignee": "Admin", "due_date": now - timedelta(days=2), "customer_id": None, "deal_id": None, "completed_at": now - timedelta(days=3), "created_at": now - timedelta(days=10), "updated_at": now - timedelta(days=3)},
    {"id": 7, "title": "Technical assessment - Logistix", "description": "Complete technical requirements assessment", "status": "completed", "priority": "high", "assignee": "Technical Team", "due_date": now - timedelta(days=5), "customer_id": 7, "deal_id": 6, "completed_at": now - timedelta(days=6), "created_at": now - timedelta(days=20), "updated_at": now - timedelta(days=6)},
    {"id": 8, "title": "Follow up on lost deal", "description": "Understand why BigRetail chose competitor", "status": "todo", "priority": "low", "assignee": "Sales Team", "due_date": now - timedelta(days=1), "customer_id": None, "deal_id": 10, "completed_at": None, "created_at": now - timedelta(days=5), "updated_at": now - timedelta(days=4)},
    {"id": 9, "title": "Prepare marketing materials", "description": "Create new case study from FinServ success", "status": "in_progress", "priority": "medium", "assignee": "Marketing", "due_date": now + timedelta(days=10), "customer_id": 3, "deal_id": 3, "completed_at": None, "created_at": now - timedelta(days=8), "updated_at": now - timedelta(days=2)},
    {"id": 10, "title": "Onboarding call - PharmaCare", "description": "Schedule onboarding for new customer", "status": "todo", "priority": "high", "assignee": "Customer Success", "due_date": now + timedelta(days=4), "customer_id": None, "deal_id": None, "completed_at": None, "created_at": now - timedelta(days=1), "updated_at": now - timedelta(hours=12)},
]

# Pre-calculated Analytics Data
ANALYTICS_DATA = {
    "total_customers": 10,
    "active_customers": 7,
    "churned_customers": 1,
    "retention_rate": 90.0,
    "total_leads": 10,
    "new_leads_30d": 8,
    "qualified_leads": 3,
    "lead_conversion_rate": 10.0,
    "avg_lead_score": 76.8,
    "best_lead_source": "referral",
    "active_deals": 7,
    "pipeline_value": 760000.00,
    "avg_deal_size": 142500.00,
    "win_rate": 50.0,
    "deals_prospecting": 2,
    "deals_qualification": 2,
    "deals_proposal": 2,
    "deals_negotiation": 2,
    "total_revenue": 1285000.00,
    "mrr": 107083.33,
    "revenue_growth": 12.5,
    "avg_ltv": 138714.29,
    "top_industry": "Energy",
    "top_acquisition_channel": "referral",
    "open_tasks": 7,
    "overdue_tasks": 1,
    "completed_tasks_7d": 2,
    "active_campaigns": 3,
    "marketing_spend": 45000.00,
    "marketing_leads": 25,
    "marketing_roi": 156.0,
    "interactions_30d": 85,
    "positive_interactions": 72.0,
    "avg_response_time": 4
}

# Revenue Chart Data (last 12 months)
REVENUE_CHART = [
    {"month": "Jan", "year": 2025, "revenue": 85000.00},
    {"month": "Feb", "year": 2025, "revenue": 92000.00},
    {"month": "Mar", "year": 2025, "revenue": 105000.00},
    {"month": "Apr", "year": 2025, "revenue": 98000.00},
    {"month": "May", "year": 2025, "revenue": 115000.00},
    {"month": "Jun", "year": 2025, "revenue": 128000.00},
    {"month": "Jul", "year": 2025, "revenue": 135000.00},
    {"month": "Aug", "year": 2025, "revenue": 142000.00},
    {"month": "Sep", "year": 2025, "revenue": 138000.00},
    {"month": "Oct", "year": 2025, "revenue": 155000.00},
    {"month": "Nov", "year": 2025, "revenue": 162000.00},
    {"month": "Dec", "year": 2025, "revenue": 130000.00},
]

# Lead Sources Distribution
LEAD_SOURCES = [
    {"source": "website", "count": 3},
    {"source": "referral", "count": 3},
    {"source": "linkedin", "count": 2},
    {"source": "advertising", "count": 2},
    {"source": "conference", "count": 1},
    {"source": "cold_call", "count": 1},
]

# Customer Industries Distribution
CUSTOMER_INDUSTRIES = [
    {"industry": "Technology", "count": 1, "value": 125000.00},
    {"industry": "Healthcare", "count": 1, "value": 89000.00},
    {"industry": "Finance", "count": 1, "value": 210000.00},
    {"industry": "Retail", "count": 1, "value": 67000.00},
    {"industry": "Manufacturing", "count": 1, "value": 45000.00},
    {"industry": "Education", "count": 1, "value": 78000.00},
    {"industry": "Logistics", "count": 1, "value": 156000.00},
    {"industry": "Media", "count": 1, "value": 34000.00},
    {"industry": "Energy", "count": 1, "value": 289000.00},
    {"industry": "Food & Beverage", "count": 1, "value": 92000.00},
]

# Pipeline Summary
PIPELINE_SUMMARY = [
    {"stage": "prospecting", "count": 2, "total_value": 110000.00, "avg_probability": 27.5},
    {"stage": "qualification", "count": 2, "total_value": 100000.00, "avg_probability": 45.0},
    {"stage": "proposal", "count": 2, "total_value": 255000.00, "avg_probability": 65.0},
    {"stage": "negotiation", "count": 2, "total_value": 470000.00, "avg_probability": 82.5},
    {"stage": "closed_won", "count": 1, "total_value": 200000.00, "avg_probability": 100.0},
    {"stage": "closed_lost", "count": 1, "total_value": 290000.00, "avg_probability": 0.0},
]

# Task Summary
TASK_SUMMARY = {
    "total": 10,
    "by_status": {"todo": 5, "in_progress": 3, "completed": 2},
    "by_priority": {"high": 5, "medium": 3, "low": 2},
    "overdue": 1
}


# Helper functions to work with fake data
def get_customers_filtered(status=None, industry=None, search=None, skip=0, limit=100):
    """Get filtered customers"""
    result = CUSTOMERS.copy()
    
    if status:
        result = [c for c in result if c["status"] == status]
    if industry:
        result = [c for c in result if c["industry"] == industry]
    if search:
        search_lower = search.lower()
        result = [c for c in result if 
                  search_lower in c["name"].lower() or 
                  search_lower in c["email"].lower() or 
                  search_lower in c["company"].lower()]
    
    return result[skip:skip + limit]


def get_leads_filtered(status=None, source=None, min_score=None, skip=0, limit=100):
    """Get filtered leads"""
    result = LEADS.copy()
    
    if status:
        result = [l for l in result if l["status"] == status]
    if source:
        result = [l for l in result if l["source"] == source]
    if min_score:
        result = [l for l in result if l["score"] >= min_score]
    
    # Sort by score descending
    result.sort(key=lambda x: x["score"], reverse=True)
    return result[skip:skip + limit]


def get_deals_filtered(stage=None, customer_id=None, min_value=None, skip=0, limit=100):
    """Get filtered deals"""
    result = DEALS.copy()
    
    if stage:
        result = [d for d in result if d["stage"] == stage]
    if customer_id:
        result = [d for d in result if d["customer_id"] == customer_id]
    if min_value:
        result = [d for d in result if d["value"] >= min_value]
    
    # Sort by value descending
    result.sort(key=lambda x: x["value"], reverse=True)
    return result[skip:skip + limit]


def get_tasks_filtered(status=None, priority=None, assignee=None, overdue_only=False, skip=0, limit=100):
    """Get filtered tasks"""
    result = TASKS.copy()
    
    if status:
        result = [t for t in result if t["status"] == status]
    if priority:
        result = [t for t in result if t["priority"] == priority]
    if assignee:
        result = [t for t in result if t["assignee"] == assignee]
    if overdue_only:
        result = [t for t in result if 
                  t["due_date"] < now and t["status"] not in ["completed", "cancelled"]]
    
    # Sort by due date
    result.sort(key=lambda x: x["due_date"])
    return result[skip:skip + limit]


def get_item_by_id(data_list, item_id):
    """Get an item by ID from a list"""
    for item in data_list:
        if item["id"] == item_id:
            return item.copy()
    return None
