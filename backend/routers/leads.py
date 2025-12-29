from fastapi import APIRouter, HTTPException
from typing import List, Optional
from fake_data import LEADS, get_leads_filtered, get_item_by_id

router = APIRouter(prefix="/leads", tags=["leads"])


@router.get("/")
def get_leads(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    source: Optional[str] = None,
    min_score: Optional[int] = None
):
    """Get all leads with optional filtering"""
    return get_leads_filtered(status, source, min_score, skip, limit)


@router.get("/{lead_id}")
def get_lead(lead_id: int):
    """Get a specific lead by ID"""
    lead = get_item_by_id(LEADS, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead


@router.post("/")
def create_lead(lead: dict):
    """Create a new lead (mock)"""
    new_id = max(l["id"] for l in LEADS) + 1
    lead["id"] = new_id
    return lead


@router.put("/{lead_id}")
def update_lead(lead_id: int, lead: dict):
    """Update an existing lead (mock)"""
    existing = get_item_by_id(LEADS, lead_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Lead not found")
    existing.update(lead)
    existing["id"] = lead_id
    return existing


@router.delete("/{lead_id}")
def delete_lead(lead_id: int):
    """Delete a lead (mock)"""
    existing = get_item_by_id(LEADS, lead_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"message": "Lead deleted successfully"}


@router.post("/{lead_id}/convert")
def convert_lead(lead_id: int):
    """Convert a lead to a customer (mock)"""
    lead = get_item_by_id(LEADS, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    if lead["status"] == "won":
        raise HTTPException(status_code=400, detail="Lead already converted")
    
    return {"message": "Lead converted successfully", "customer_id": 11}
