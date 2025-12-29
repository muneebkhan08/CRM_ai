"""
CRM Backend API with AI-Powered Growth Agent
FastAPI application for managing customers, leads, deals, tasks, and analytics
Using local fake data (no database required)
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from routers import customers_router, leads_router, deals_router, tasks_router, analytics_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler - runs on startup and shutdown"""
    print("✅ CRM API started with fake data")
    yield
    print("👋 Shutting down CRM API")


app = FastAPI(
    title="CRM Growth Agent API",
    description="""
    A comprehensive CRM API with AI-powered growth planning capabilities.
    
    ## Features
    - **Customers**: Manage customer relationships and track lifetime value
    - **Leads**: Track and convert leads through the sales funnel
    - **Deals**: Manage sales pipeline and deal stages
    - **Tasks**: Organize and prioritize team activities
    - **Analytics**: Get insights and AI-powered growth recommendations
    
    ## AI Agent
    The analytics endpoints include an AI agent powered by DeepSeek that analyzes your CRM data 
    and provides strategic growth plans for different timeframes (day, week, month, quarter, year).
    
    ## Note
    This version uses local fake data for demonstration purposes.
    """,
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(customers_router, prefix="/api")
app.include_router(leads_router, prefix="/api")
app.include_router(deals_router, prefix="/api")
app.include_router(tasks_router, prefix="/api")
app.include_router(analytics_router, prefix="/api")


@app.get("/")
def root():
    """API root endpoint"""
    return {
        "name": "CRM Growth Agent API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
        "endpoints": {
            "customers": "/api/customers",
            "leads": "/api/leads",
            "deals": "/api/deals",
            "tasks": "/api/tasks",
            "analytics": "/api/analytics"
        }
    }


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
