"""
Comprehensive Seed Data Generator for CRM
Generates 100+ realistic fake records across all entities
"""
import random
from datetime import datetime, timedelta
from database.models import Customer, Lead, Deal, Task, Interaction, Revenue, MarketingCampaign
from database.database import SessionLocal, engine, Base


# Realistic data pools
FIRST_NAMES = [
    "James", "Emma", "Michael", "Olivia", "William", "Sophia", "Alexander", "Isabella",
    "Benjamin", "Mia", "Daniel", "Charlotte", "Henry", "Amelia", "Sebastian", "Harper",
    "Jack", "Evelyn", "Aiden", "Abigail", "Owen", "Emily", "Samuel", "Elizabeth",
    "Ryan", "Sofia", "Nathan", "Avery", "Leo", "Ella", "David", "Scarlett",
    "Joseph", "Grace", "Charles", "Chloe", "Thomas", "Victoria", "Christopher", "Riley"
]

LAST_NAMES = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
    "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson",
    "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker",
    "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Adams"
]

COMPANIES = [
    "TechVenture Solutions", "Global Dynamics Inc", "Innovate Labs", "CloudFirst Systems",
    "Digital Horizons", "FutureScale Technologies", "Quantum Leap Corp", "DataStream Analytics",
    "Nexus Innovations", "Apex Digital", "Synergy Solutions", "BlueSky Enterprises",
    "Velocity Tech", "Stellar Systems", "Pinnacle Partners", "Momentum Industries",
    "Catalyst Corp", "Horizon Holdings", "Frontier Tech", "Eclipse Innovations",
    "Summit Solutions", "Vanguard Systems", "Elevate Enterprises", "Precision Partners",
    "Amplify Tech", "Beacon Digital", "Keystone Industries", "Pathway Solutions",
    "Zenith Corp", "Meridian Technologies", "Aurora Innovations", "Phoenix Digital"
]

INDUSTRIES = [
    "Technology", "Healthcare", "Finance", "Manufacturing", "Retail", "Education",
    "Real Estate", "Consulting", "Marketing", "Legal", "Energy", "Telecommunications",
    "Transportation", "Hospitality", "Media", "Agriculture", "Construction", "Insurance"
]

ACQUISITION_SOURCES = [
    "Website", "Referral", "LinkedIn", "Cold Call", "Trade Show", "Google Ads",
    "Facebook Ads", "Content Marketing", "Email Campaign", "Partner Referral",
    "Webinar", "Industry Event", "Direct Mail", "SEO", "Word of Mouth"
]

LEAD_SOURCES = [
    "Website Form", "LinkedIn Campaign", "Google Ads", "Facebook Lead Gen",
    "Referral Program", "Trade Show", "Webinar", "Content Download",
    "Cold Outreach", "Partner Channel", "Organic Search", "Email Campaign"
]

JOB_TITLES = [
    "CEO", "CTO", "CFO", "COO", "VP of Sales", "VP of Marketing", "Director of IT",
    "Director of Operations", "Marketing Manager", "Sales Manager", "Product Manager",
    "Business Development Manager", "Head of Engineering", "Chief Revenue Officer",
    "Head of Growth", "Operations Director", "IT Manager", "Finance Director"
]

DEAL_TITLES = [
    "Enterprise License Deal", "Annual Subscription Renewal", "Custom Integration Project",
    "Platform Migration Contract", "Consulting Engagement", "Implementation Services",
    "Software License Agreement", "Multi-year Partnership", "Expansion Deal",
    "New Business Contract", "Service Level Agreement", "Technology Partnership",
    "Digital Transformation Project", "Cloud Migration Deal", "Support Contract"
]

TASK_TITLES = [
    "Follow up on proposal", "Schedule demo call", "Send pricing information",
    "Prepare contract draft", "Review customer requirements", "Update CRM records",
    "Send onboarding materials", "Schedule kickoff meeting", "Conduct quarterly review",
    "Prepare presentation deck", "Gather customer feedback", "Process renewal",
    "Address support ticket", "Plan account strategy", "Complete training session",
    "Send welcome email", "Review performance metrics", "Prepare monthly report"
]

INTERACTION_SUBJECTS = [
    "Initial discovery call", "Product demo", "Proposal review", "Contract negotiation",
    "Quarterly business review", "Support request", "Feature discussion", "Pricing call",
    "Implementation kickoff", "Training session", "Renewal discussion", "Upsell opportunity",
    "Customer feedback session", "Technical consultation", "Strategy alignment"
]

CAMPAIGN_NAMES = [
    "Q1 Lead Generation Push", "Product Launch Campaign", "Holiday Promotion 2024",
    "Enterprise Outreach Initiative", "Webinar Series - Growth Edition", "Content Marketing Blitz",
    "LinkedIn Thought Leadership", "Email Nurture Sequence", "Trade Show Follow-up",
    "Customer Referral Program", "SEO Optimization Sprint", "Retargeting Campaign",
    "Brand Awareness Drive", "Partner Co-marketing", "Video Marketing Initiative"
]

MARKETING_CHANNELS = ["email", "social", "ppc", "content", "events", "webinar", "partner", "seo"]

ASSIGNEES = ["Alice Johnson", "Bob Smith", "Carol Davis", "David Wilson", "Emma Brown", "Frank Miller"]


def random_date(start_days_ago: int, end_days_ago: int = 0) -> datetime:
    """Generate a random date between start_days_ago and end_days_ago"""
    days = random.randint(end_days_ago, start_days_ago)
    return datetime.utcnow() - timedelta(days=days)


def random_future_date(start_days: int = 1, end_days: int = 90) -> datetime:
    """Generate a random future date"""
    days = random.randint(start_days, end_days)
    return datetime.utcnow() + timedelta(days=days)


def generate_email(first_name: str, last_name: str, company: str) -> str:
    """Generate a realistic email address"""
    domain = company.lower().replace(" ", "").replace(".", "")[:15] + ".com"
    formats = [
        f"{first_name.lower()}.{last_name.lower()}@{domain}",
        f"{first_name[0].lower()}{last_name.lower()}@{domain}",
        f"{first_name.lower()}@{domain}",
    ]
    return random.choice(formats)


def generate_phone() -> str:
    """Generate a random phone number"""
    return f"+1-{random.randint(200,999)}-{random.randint(100,999)}-{random.randint(1000,9999)}"


def seed_customers(db, count: int = 50) -> list:
    """Generate customer records"""
    customers = []
    for _ in range(count):
        first_name = random.choice(FIRST_NAMES)
        last_name = random.choice(LAST_NAMES)
        company = random.choice(COMPANIES)
        
        # Distribution: 60% active, 20% prospect, 15% inactive, 5% churned
        status_weights = [("active", 60), ("prospect", 20), ("inactive", 15), ("churned", 5)]
        status = random.choices([s[0] for s in status_weights], [s[1] for s in status_weights])[0]
        
        customer = Customer(
            name=f"{first_name} {last_name}",
            email=generate_email(first_name, last_name, company),
            phone=generate_phone(),
            company=company,
            industry=random.choice(INDUSTRIES),
            status=status,
            lifetime_value=round(random.uniform(1000, 500000), 2) if status == "active" else round(random.uniform(0, 50000), 2),
            acquisition_source=random.choice(ACQUISITION_SOURCES),
            notes=f"Customer acquired through {random.choice(ACQUISITION_SOURCES).lower()}. Primary contact for {company}.",
            created_at=random_date(365, 30),
            updated_at=random_date(30, 0)
        )
        db.add(customer)
        customers.append(customer)
    
    db.commit()
    for c in customers:
        db.refresh(c)
    return customers


def seed_leads(db, count: int = 80) -> list:
    """Generate lead records with realistic distribution"""
    leads = []
    
    # Status distribution for realistic pipeline
    status_distribution = [
        ("new", 25), ("contacted", 20), ("qualified", 20),
        ("proposal", 15), ("negotiation", 10), ("won", 5), ("lost", 5)
    ]
    
    for _ in range(count):
        first_name = random.choice(FIRST_NAMES)
        last_name = random.choice(LAST_NAMES)
        company = random.choice(COMPANIES)
        status = random.choices([s[0] for s in status_distribution], [s[1] for s in status_distribution])[0]
        
        # Score correlates with status
        score_ranges = {
            "new": (10, 30), "contacted": (25, 50), "qualified": (45, 70),
            "proposal": (60, 80), "negotiation": (75, 90), "won": (85, 100), "lost": (20, 50)
        }
        score_range = score_ranges[status]
        
        lead = Lead(
            name=f"{first_name} {last_name}",
            email=generate_email(first_name, last_name, company),
            phone=generate_phone(),
            company=company,
            job_title=random.choice(JOB_TITLES),
            source=random.choice(LEAD_SOURCES),
            status=status,
            score=random.randint(score_range[0], score_range[1]),
            estimated_value=round(random.uniform(5000, 250000), 2),
            notes=f"Lead from {random.choice(LEAD_SOURCES)}. Interested in our {random.choice(['enterprise', 'professional', 'starter'])} plan.",
            created_at=random_date(180, 7),
            updated_at=random_date(7, 0),
            converted_at=random_date(30, 0) if status == "won" else None
        )
        db.add(lead)
        leads.append(lead)
    
    db.commit()
    return leads


def seed_deals(db, customers: list, count: int = 60) -> list:
    """Generate deal records with pipeline distribution"""
    deals = []
    
    stage_distribution = [
        ("prospecting", 20), ("qualification", 20), ("proposal", 25),
        ("negotiation", 15), ("closed_won", 12), ("closed_lost", 8)
    ]
    
    for _ in range(count):
        stage = random.choices([s[0] for s in stage_distribution], [s[1] for s in stage_distribution])[0]
        
        # Probability correlates with stage
        prob_ranges = {
            "prospecting": (5, 20), "qualification": (20, 40), "proposal": (40, 60),
            "negotiation": (60, 80), "closed_won": (100, 100), "closed_lost": (0, 0)
        }
        prob_range = prob_ranges[stage]
        
        # Value tends to be higher for later stages (survivors)
        value_multiplier = {"prospecting": 1, "qualification": 1.2, "proposal": 1.5, "negotiation": 1.8, "closed_won": 2, "closed_lost": 0.8}
        base_value = random.uniform(10000, 200000)
        
        deal = Deal(
            title=f"{random.choice(DEAL_TITLES)} - {random.choice(COMPANIES)}",
            description=f"Deal for {random.choice(['annual subscription', 'multi-year contract', 'implementation project', 'consulting engagement'])}",
            customer_id=random.choice(customers).id if customers and random.random() > 0.2 else None,
            stage=stage,
            value=round(base_value * value_multiplier[stage], 2),
            probability=random.randint(prob_range[0], prob_range[1]),
            expected_close_date=random_future_date(7, 120) if stage not in ["closed_won", "closed_lost"] else None,
            actual_close_date=random_date(60, 0) if stage in ["closed_won", "closed_lost"] else None,
            created_at=random_date(120, 14),
            updated_at=random_date(14, 0)
        )
        db.add(deal)
        deals.append(deal)
    
    db.commit()
    return deals


def seed_tasks(db, customers: list, count: int = 100) -> list:
    """Generate task records"""
    tasks = []
    
    priority_dist = [("low", 15), ("medium", 50), ("high", 25), ("urgent", 10)]
    status_dist = [("todo", 40), ("in_progress", 30), ("completed", 25), ("cancelled", 5)]
    
    for _ in range(count):
        status = random.choices([s[0] for s in status_dist], [s[1] for s in status_dist])[0]
        priority = random.choices([p[0] for p in priority_dist], [p[1] for p in priority_dist])[0]
        
        task = Task(
            title=random.choice(TASK_TITLES),
            description=f"Task related to customer engagement and follow-up activities.",
            customer_id=random.choice(customers).id if customers and random.random() > 0.3 else None,
            priority=priority,
            status=status,
            due_date=random_future_date(-10, 30),  # Some overdue tasks
            completed_at=random_date(30, 0) if status == "completed" else None,
            assignee=random.choice(ASSIGNEES),
            created_at=random_date(60, 7),
            updated_at=random_date(7, 0)
        )
        db.add(task)
        tasks.append(task)
    
    db.commit()
    return tasks


def seed_interactions(db, customers: list, count: int = 200) -> list:
    """Generate interaction records"""
    interactions = []
    
    interaction_types = ["email", "call", "meeting", "demo", "support"]
    outcomes = ["positive", "neutral", "negative"]
    outcome_weights = [50, 35, 15]
    
    for _ in range(count):
        int_type = random.choice(interaction_types)
        duration = {
            "email": random.randint(5, 15),
            "call": random.randint(10, 45),
            "meeting": random.randint(30, 90),
            "demo": random.randint(30, 60),
            "support": random.randint(15, 60)
        }
        
        interaction = Interaction(
            customer_id=random.choice(customers).id if customers else 1,
            type=int_type,
            subject=random.choice(INTERACTION_SUBJECTS),
            notes=f"{int_type.capitalize()} interaction regarding account status and opportunities.",
            outcome=random.choices(outcomes, outcome_weights)[0],
            duration_minutes=duration[int_type],
            created_at=random_date(180, 0)
        )
        db.add(interaction)
        interactions.append(interaction)
    
    db.commit()
    return interactions


def seed_revenue(db, customers: list, count: int = 150) -> list:
    """Generate revenue records over past year"""
    revenues = []
    
    revenue_types = ["subscription", "one_time", "upsell", "renewal"]
    type_weights = [50, 20, 15, 15]
    
    for _ in range(count):
        rev_type = random.choices(revenue_types, type_weights)[0]
        
        # Amount varies by type
        amount_ranges = {
            "subscription": (500, 15000),
            "one_time": (1000, 50000),
            "upsell": (500, 10000),
            "renewal": (2000, 20000)
        }
        amount_range = amount_ranges[rev_type]
        
        revenue = Revenue(
            customer_id=random.choice(customers).id if customers else 1,
            amount=round(random.uniform(amount_range[0], amount_range[1]), 2),
            type=rev_type,
            description=f"{rev_type.capitalize()} revenue from customer account",
            date=random_date(365, 0),
            created_at=random_date(365, 0)
        )
        db.add(revenue)
        revenues.append(revenue)
    
    db.commit()
    return revenues


def seed_campaigns(db, count: int = 15) -> list:
    """Generate marketing campaign records"""
    campaigns = []
    
    statuses = ["draft", "active", "paused", "completed"]
    status_weights = [10, 40, 15, 35]
    
    for i in range(count):
        status = random.choices(statuses, status_weights)[0]
        budget = round(random.uniform(5000, 100000), 2)
        spent_ratio = {"draft": 0, "active": random.uniform(0.3, 0.7), "paused": random.uniform(0.4, 0.6), "completed": random.uniform(0.85, 1.0)}
        
        leads_gen = random.randint(10, 500) if status != "draft" else 0
        conv_rate = random.uniform(0.05, 0.25)
        
        campaign = MarketingCampaign(
            name=CAMPAIGN_NAMES[i] if i < len(CAMPAIGN_NAMES) else f"Campaign {i+1}",
            channel=random.choice(MARKETING_CHANNELS),
            status=status,
            budget=budget,
            spent=round(budget * spent_ratio[status], 2),
            leads_generated=leads_gen,
            conversions=int(leads_gen * conv_rate),
            start_date=random_date(180, 30) if status != "draft" else random_future_date(1, 30),
            end_date=random_date(30, 0) if status == "completed" else random_future_date(30, 90),
            created_at=random_date(200, 30)
        )
        db.add(campaign)
        campaigns.append(campaign)
    
    db.commit()
    return campaigns


def seed_all_data():
    """Main function to seed all data"""
    print("🌱 Starting CRM Data Seeding...")
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Check if data already exists
        existing_customers = db.query(Customer).count()
        if existing_customers > 0:
            print(f"⚠️  Database already contains {existing_customers} customers. Skipping seed.")
            return
        
        print("📊 Generating Customers...")
        customers = seed_customers(db, 50)
        print(f"   ✓ Created {len(customers)} customers")
        
        print("🎯 Generating Leads...")
        leads = seed_leads(db, 80)
        print(f"   ✓ Created {len(leads)} leads")
        
        print("💰 Generating Deals...")
        deals = seed_deals(db, customers, 60)
        print(f"   ✓ Created {len(deals)} deals")
        
        print("✅ Generating Tasks...")
        tasks = seed_tasks(db, customers, 100)
        print(f"   ✓ Created {len(tasks)} tasks")
        
        print("💬 Generating Interactions...")
        interactions = seed_interactions(db, customers, 200)
        print(f"   ✓ Created {len(interactions)} interactions")
        
        print("💵 Generating Revenue Records...")
        revenues = seed_revenue(db, customers, 150)
        print(f"   ✓ Created {len(revenues)} revenue records")
        
        print("📢 Generating Marketing Campaigns...")
        campaigns = seed_campaigns(db, 15)
        print(f"   ✓ Created {len(campaigns)} campaigns")
        
        print("\n✨ Seed completed successfully!")
        print(f"   Total records created: {len(customers) + len(leads) + len(deals) + len(tasks) + len(interactions) + len(revenues) + len(campaigns)}")
        
    except Exception as e:
        print(f"❌ Error seeding data: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_all_data()
