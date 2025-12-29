from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from .database import Base


class CustomerStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    CHURNED = "churned"
    PROSPECT = "prospect"


class LeadStatus(str, enum.Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    PROPOSAL = "proposal"
    NEGOTIATION = "negotiation"
    WON = "won"
    LOST = "lost"


class DealStage(str, enum.Enum):
    PROSPECTING = "prospecting"
    QUALIFICATION = "qualification"
    PROPOSAL = "proposal"
    NEGOTIATION = "negotiation"
    CLOSED_WON = "closed_won"
    CLOSED_LOST = "closed_lost"


class TaskPriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class TaskStatus(str, enum.Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class Customer(Base):
    __tablename__ = "customers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True)
    phone = Column(String(50))
    company = Column(String(255))
    industry = Column(String(100))
    status = Column(String(50), default=CustomerStatus.ACTIVE.value)
    lifetime_value = Column(Float, default=0.0)
    acquisition_source = Column(String(100))
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    deals = relationship("Deal", back_populates="customer")
    tasks = relationship("Task", back_populates="customer")
    interactions = relationship("Interaction", back_populates="customer")


class Lead(Base):
    __tablename__ = "leads"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), index=True)
    phone = Column(String(50))
    company = Column(String(255))
    job_title = Column(String(100))
    source = Column(String(100))  # website, referral, linkedin, cold_call, etc.
    status = Column(String(50), default=LeadStatus.NEW.value)
    score = Column(Integer, default=0)  # 0-100
    estimated_value = Column(Float, default=0.0)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    converted_at = Column(DateTime, nullable=True)
    converted_to_customer_id = Column(Integer, ForeignKey("customers.id"), nullable=True)


class Deal(Base):
    __tablename__ = "deals"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    stage = Column(String(50), default=DealStage.PROSPECTING.value)
    value = Column(Float, default=0.0)
    probability = Column(Integer, default=10)  # 0-100%
    expected_close_date = Column(DateTime)
    actual_close_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    customer = relationship("Customer", back_populates="deals")


class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=True)
    priority = Column(String(20), default=TaskPriority.MEDIUM.value)
    status = Column(String(20), default=TaskStatus.TODO.value)
    due_date = Column(DateTime)
    completed_at = Column(DateTime, nullable=True)
    assignee = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    customer = relationship("Customer", back_populates="tasks")


class Interaction(Base):
    __tablename__ = "interactions"
    
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    type = Column(String(50))  # email, call, meeting, demo, support
    subject = Column(String(255))
    notes = Column(Text)
    outcome = Column(String(100))  # positive, neutral, negative
    duration_minutes = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    customer = relationship("Customer", back_populates="interactions")


class Revenue(Base):
    __tablename__ = "revenue"
    
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    amount = Column(Float)
    type = Column(String(50))  # subscription, one_time, upsell, renewal
    description = Column(String(255))
    date = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)


class MarketingCampaign(Base):
    __tablename__ = "marketing_campaigns"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    channel = Column(String(100))  # email, social, ppc, content, events
    status = Column(String(50))  # draft, active, paused, completed
    budget = Column(Float, default=0.0)
    spent = Column(Float, default=0.0)
    leads_generated = Column(Integer, default=0)
    conversions = Column(Integer, default=0)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
