from fastapi import APIRouter, HTTPException
from typing import List, Optional
from fake_data import CUSTOMERS, get_customers_filtered, get_item_by_id

router = APIRouter(prefix="/customers", tags=["customers"])


@router.get("/")
def get_customers(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    industry: Optional[str] = None,
    search: Optional[str] = None
):
    """Get all customers with optional filtering"""
    return get_customers_filtered(status, industry, search, skip, limit)


@router.get("/{customer_id}")
def get_customer(customer_id: int):
    """Get a specific customer by ID"""
    customer = get_item_by_id(CUSTOMERS, customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer


@router.post("/")
def create_customer(customer: dict):
    """Create a new customer (mock)"""
    new_id = max(c["id"] for c in CUSTOMERS) + 1
    customer["id"] = new_id
    return customer


@router.put("/{customer_id}")
def update_customer(customer_id: int, customer: dict):
    """Update an existing customer (mock)"""
    existing = get_item_by_id(CUSTOMERS, customer_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Customer not found")
    existing.update(customer)
    existing["id"] = customer_id
    return existing


@router.delete("/{customer_id}")
def delete_customer(customer_id: int):
    """Delete a customer (mock)"""
    existing = get_item_by_id(CUSTOMERS, customer_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Customer not found")
    return {"message": "Customer deleted successfully"}
