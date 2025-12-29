from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import datetime
from fake_data import TASKS, TASK_SUMMARY, get_tasks_filtered, get_item_by_id

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/")
def get_tasks(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    priority: Optional[str] = None,
    assignee: Optional[str] = None,
    overdue_only: bool = False
):
    """Get all tasks with optional filtering"""
    return get_tasks_filtered(status, priority, assignee, overdue_only, skip, limit)


@router.get("/summary")
def get_task_summary():
    """Get task summary statistics"""
    return TASK_SUMMARY


@router.get("/{task_id}")
def get_task(task_id: int):
    """Get a specific task by ID"""
    task = get_item_by_id(TASKS, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.post("/")
def create_task(task: dict):
    """Create a new task (mock)"""
    new_id = max(t["id"] for t in TASKS) + 1
    task["id"] = new_id
    return task


@router.put("/{task_id}")
def update_task(task_id: int, task: dict):
    """Update an existing task (mock)"""
    existing = get_item_by_id(TASKS, task_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Task not found")
    existing.update(task)
    existing["id"] = task_id
    return existing


@router.put("/{task_id}/complete")
def complete_task(task_id: int):
    """Mark a task as completed (mock)"""
    existing = get_item_by_id(TASKS, task_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Task not found")
    existing["status"] = "completed"
    existing["completed_at"] = datetime.utcnow().isoformat()
    return existing


@router.delete("/{task_id}")
def delete_task(task_id: int):
    """Delete a task (mock)"""
    existing = get_item_by_id(TASKS, task_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}
