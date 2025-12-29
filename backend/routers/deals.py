from fastapi import APIRouter, HTTPException
from typing import List, Optional
from fake_data import DEALS, PIPELINE_SUMMARY, get_deals_filtered, get_item_by_id

router = APIRouter(prefix="/deals", tags=["deals"])


@router.get("/")
def get_deals(
    skip: int = 0,
    limit: int = 100,
    stage: Optional[str] = None,
    customer_id: Optional[int] = None,
    min_value: Optional[float] = None
):
    """Get all deals with optional filtering"""
    return get_deals_filtered(stage, customer_id, min_value, skip, limit)


@router.get("/pipeline")
def get_pipeline_summary():
    """Get deal pipeline summary by stage"""
    return PIPELINE_SUMMARY


@router.get("/{deal_id}")
def get_deal(deal_id: int):
    """Get a specific deal by ID"""
    deal = get_item_by_id(DEALS, deal_id)
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    return deal


@router.post("/")
def create_deal(deal: dict):
    """Create a new deal (mock)"""
    new_id = max(d["id"] for d in DEALS) + 1
    deal["id"] = new_id
    return deal


@router.put("/{deal_id}")
def update_deal(deal_id: int, deal: dict):
    """Update an existing deal (mock)"""
    existing = get_item_by_id(DEALS, deal_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Deal not found")
    existing.update(deal)
    existing["id"] = deal_id
    return existing


@router.delete("/{deal_id}")
def delete_deal(deal_id: int):
    """Delete a deal (mock)"""
    existing = get_item_by_id(DEALS, deal_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Deal not found")
    return {"message": "Deal deleted successfully"}


@router.put("/{deal_id}/stage")
def update_deal_stage(deal_id: int, stage: str):
    """Update deal stage (mock)"""
    existing = get_item_by_id(DEALS, deal_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Deal not found")
    
    valid_stages = ["prospecting", "qualification", "proposal", "negotiation", "closed_won", "closed_lost"]
    if stage not in valid_stages:
        raise HTTPException(status_code=400, detail=f"Invalid stage. Must be one of: {valid_stages}")
    
    stage_probability = {
        "prospecting": 10, "qualification": 30, "proposal": 50,
        "negotiation": 70, "closed_won": 100, "closed_lost": 0
    }
    existing["stage"] = stage
    existing["probability"] = stage_probability.get(stage, 10)
    return existing
