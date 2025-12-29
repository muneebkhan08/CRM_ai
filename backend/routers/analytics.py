from fastapi import APIRouter, HTTPException
from datetime import datetime
from typing import Optional
from fake_data import (
    ANALYTICS_DATA, REVENUE_CHART, LEAD_SOURCES, CUSTOMER_INDUSTRIES
)
from schemas import GrowthPlanRequest
from agent import GrowthAgent

router = APIRouter(prefix="/analytics", tags=["analytics"])


def get_analytics_data() -> dict:
    """Return pre-calculated analytics data"""
    return ANALYTICS_DATA.copy()


@router.get("/overview")
def get_overview():
    """Get analytics overview dashboard data"""
    return get_analytics_data()


@router.get("/revenue-chart")
def get_revenue_chart():
    """Get revenue data for charts (last 12 months)"""
    return REVENUE_CHART


@router.get("/lead-sources")
def get_lead_sources():
    """Get lead distribution by source"""
    return LEAD_SOURCES


@router.get("/customer-industries")
def get_customer_industries():
    """Get customer distribution by industry"""
    return CUSTOMER_INDUSTRIES


@router.post("/growth-plan")
def generate_growth_plan(request: GrowthPlanRequest):
    """Generate AI-powered growth plan"""
    analytics_data = get_analytics_data()
    
    try:
        agent = GrowthAgent()
        plan = agent.generate_growth_plan(
            timeframe=request.timeframe,
            analytics_data=analytics_data,
            focus_area=request.focus_area
        )
        return plan
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating plan: {str(e)}")


@router.post("/ask")
def ask_agent(question: str):
    """Ask the AI agent a question about the CRM data"""
    analytics_data = get_analytics_data()
    
    try:
        agent = GrowthAgent()
        response = agent.ask_question(question, analytics_data)
        return {"question": question, "answer": response}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")
