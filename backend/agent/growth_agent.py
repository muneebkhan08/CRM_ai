"""
LangChain Growth Agent powered by Google Gemini
Analyzes CRM data and provides strategic growth plans
"""
import os
from datetime import datetime
from typing import Optional
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import HumanMessage, SystemMessage

load_dotenv()


class GrowthAgent:
    """AI Agent for analyzing CRM data and generating growth plans"""
    
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key or api_key == "your_gemini_api_key_here":
            raise ValueError("Please set a valid GEMINI_API_KEY in your .env file")
        
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=api_key,
            temperature=0.7
        )
        
        self.system_prompt = """You are an expert CRM analyst and business growth strategist. 
Your role is to analyze customer relationship management data and provide actionable growth plans.

You have access to the following CRM data metrics:
{crm_data}

Based on this data, provide strategic recommendations that are:
1. Specific and actionable
2. Time-bound and measurable
3. Prioritized by potential impact
4. Realistic based on current resources

Format your response as a structured growth plan with:
- Executive Summary
- Key Insights (3-5 bullet points)
- Action Items (with priority: High/Medium/Low)
- Predicted Outcomes (if recommendations are followed)
- Risks and Challenges to consider

Be data-driven and reference specific metrics from the provided data."""

    def _format_crm_data(self, analytics_data: dict) -> str:
        """Format CRM analytics data for the prompt"""
        return f"""
=== CRM ANALYTICS OVERVIEW ===

CUSTOMER METRICS:
- Total Customers: {analytics_data.get('total_customers', 0)}
- Active Customers: {analytics_data.get('active_customers', 0)}
- Churned Customers: {analytics_data.get('churned_customers', 0)}
- Customer Retention Rate: {analytics_data.get('retention_rate', 0):.1f}%

LEAD PIPELINE:
- Total Leads: {analytics_data.get('total_leads', 0)}
- New Leads (Last 30 Days): {analytics_data.get('new_leads_30d', 0)}
- Qualified Leads: {analytics_data.get('qualified_leads', 0)}
- Lead Conversion Rate: {analytics_data.get('lead_conversion_rate', 0):.1f}%
- Average Lead Score: {analytics_data.get('avg_lead_score', 0):.1f}

SALES PIPELINE:
- Total Active Deals: {analytics_data.get('active_deals', 0)}
- Pipeline Value: ${analytics_data.get('pipeline_value', 0):,.2f}
- Average Deal Size: ${analytics_data.get('avg_deal_size', 0):,.2f}
- Win Rate: {analytics_data.get('win_rate', 0):.1f}%
- Deals by Stage:
  * Prospecting: {analytics_data.get('deals_prospecting', 0)}
  * Qualification: {analytics_data.get('deals_qualification', 0)}
  * Proposal: {analytics_data.get('deals_proposal', 0)}
  * Negotiation: {analytics_data.get('deals_negotiation', 0)}

REVENUE METRICS:
- Total Revenue (YTD): ${analytics_data.get('total_revenue', 0):,.2f}
- Monthly Recurring Revenue: ${analytics_data.get('mrr', 0):,.2f}
- Revenue Growth (MoM): {analytics_data.get('revenue_growth', 0):.1f}%
- Average Customer Lifetime Value: ${analytics_data.get('avg_ltv', 0):,.2f}

TASK & ACTIVITY:
- Open Tasks: {analytics_data.get('open_tasks', 0)}
- Overdue Tasks: {analytics_data.get('overdue_tasks', 0)}
- Tasks Completed (Last 7 Days): {analytics_data.get('completed_tasks_7d', 0)}

MARKETING:
- Active Campaigns: {analytics_data.get('active_campaigns', 0)}
- Total Marketing Spend: ${analytics_data.get('marketing_spend', 0):,.2f}
- Leads from Marketing: {analytics_data.get('marketing_leads', 0)}
- Marketing ROI: {analytics_data.get('marketing_roi', 0):.1f}%

CUSTOMER INTERACTIONS:
- Total Interactions (Last 30 Days): {analytics_data.get('interactions_30d', 0)}
- Positive Outcomes: {analytics_data.get('positive_interactions', 0):.1f}%
- Average Response Time: {analytics_data.get('avg_response_time', 0)} hours

TOP PERFORMING:
- Best Lead Source: {analytics_data.get('best_lead_source', 'N/A')}
- Highest Revenue Industry: {analytics_data.get('top_industry', 'N/A')}
- Top Acquisition Channel: {analytics_data.get('top_acquisition_channel', 'N/A')}
"""

    def generate_growth_plan(
        self, 
        timeframe: str, 
        analytics_data: dict, 
        focus_area: Optional[str] = None
    ) -> dict:
        """
        Generate a growth plan for the specified timeframe
        
        Args:
            timeframe: day, week, month, quarter, or year
            analytics_data: Dictionary containing CRM analytics
            focus_area: Optional focus (sales, marketing, retention, or all)
        
        Returns:
            Structured growth plan dictionary
        """
        timeframe_context = {
            "day": "the next 24 hours, focusing on immediate actions and quick wins",
            "week": "the next 7 days, balancing quick wins with short-term initiatives",
            "month": "the next 30 days, with emphasis on measurable monthly targets",
            "quarter": "the next 90 days, focusing on strategic initiatives and quarterly goals",
            "year": "the next 12 months, with long-term vision and major milestones"
        }
        
        focus_context = ""
        if focus_area and focus_area != "all":
            focus_map = {
                "sales": "Focus specifically on sales pipeline optimization, deal closure strategies, and revenue growth.",
                "marketing": "Focus specifically on lead generation, marketing campaigns, and brand awareness.",
                "retention": "Focus specifically on customer retention, reducing churn, and increasing customer lifetime value."
            }
            focus_context = focus_map.get(focus_area, "")
        
        crm_data_formatted = self._format_crm_data(analytics_data)
        
        user_prompt = f"""
Please analyze the CRM data and create a comprehensive growth plan for {timeframe_context.get(timeframe, 'the specified period')}.

{focus_context}

Provide your analysis in the following JSON-like structure:

## EXECUTIVE SUMMARY
[2-3 sentence overview of the current state and recommended direction]

## KEY INSIGHTS
1. [Insight based on data]
2. [Insight based on data]
3. [Insight based on data]
4. [Insight based on data]
5. [Insight based on data]

## ACTION ITEMS
For each action item, provide:
- Title
- Description
- Priority (High/Medium/Low)
- Expected Impact
- Responsible Party/Team

### Immediate Actions (This {timeframe})
1. ...
2. ...
3. ...

### Secondary Actions
1. ...
2. ...

## PREDICTED OUTCOMES
If these recommendations are implemented:
- Revenue Impact: [expected change]
- Customer Impact: [expected change]
- Pipeline Impact: [expected change]
- Efficiency Gains: [expected improvements]

## RISKS AND CHALLENGES
1. [Risk or challenge with mitigation strategy]
2. [Risk or challenge with mitigation strategy]
3. [Risk or challenge with mitigation strategy]

Please be specific, data-driven, and actionable in your recommendations.
"""

        messages = [
            SystemMessage(content=self.system_prompt.format(crm_data=crm_data_formatted)),
            HumanMessage(content=user_prompt)
        ]
        
        try:
            response = self.llm.invoke(messages)
            plan_content = response.content
            
            # Parse the response into structured format
            return self._parse_growth_plan(plan_content, timeframe, analytics_data)
            
        except Exception as e:
            return {
                "timeframe": timeframe,
                "analysis_summary": f"Error generating plan: {str(e)}",
                "key_insights": ["Unable to generate insights due to an error"],
                "action_items": [],
                "predicted_outcomes": {},
                "risks_and_challenges": ["Please check your API key and try again"],
                "generated_at": datetime.utcnow().isoformat()
            }

    def _parse_growth_plan(self, content: str, timeframe: str, analytics_data: dict) -> dict:
        """Parse the LLM response into a structured format"""
        
        # Extract sections from the response
        sections = {
            "summary": "",
            "insights": [],
            "actions": [],
            "outcomes": {},
            "risks": []
        }
        
        # Simple parsing - in production, you'd want more robust parsing
        lines = content.split('\n')
        current_section = None
        current_text = []
        
        for line in lines:
            line_lower = line.lower().strip()
            
            if 'executive summary' in line_lower:
                current_section = 'summary'
                current_text = []
            elif 'key insight' in line_lower:
                if current_section == 'summary':
                    sections['summary'] = ' '.join(current_text).strip()
                current_section = 'insights'
                current_text = []
            elif 'action item' in line_lower or 'immediate action' in line_lower:
                current_section = 'actions'
            elif 'predicted outcome' in line_lower:
                current_section = 'outcomes'
            elif 'risk' in line_lower and 'challenge' in line_lower:
                current_section = 'risks'
            elif current_section:
                if line.strip():
                    if current_section == 'summary':
                        current_text.append(line.strip())
                    elif current_section == 'insights' and line.strip().startswith(('1', '2', '3', '4', '5', '-', '*', '•')):
                        # Clean up the insight text
                        insight = line.strip().lstrip('0123456789.-*• ')
                        if insight and len(insight) > 5:
                            sections['insights'].append(insight)
                    elif current_section == 'actions' and line.strip():
                        # Parse action items
                        if line.strip().startswith(('1', '2', '3', '-', '*', '•')) or '**' in line or 'Title' in line:
                            action_text = line.strip().lstrip('0123456789.-*• ')
                            if action_text and len(action_text) > 5:
                                priority = 'medium'
                                if 'high' in line.lower():
                                    priority = 'high'
                                elif 'low' in line.lower():
                                    priority = 'low'
                                sections['actions'].append({
                                    "title": action_text[:100].replace('**', '').strip(),
                                    "priority": priority,
                                    "description": action_text
                                })
                    elif current_section == 'risks' and line.strip().startswith(('1', '2', '3', '-', '*', '•')):
                        risk = line.strip().lstrip('0123456789.-*• ')
                        if risk and len(risk) > 5:
                            sections['risks'].append(risk)
        
        # Finalize summary if not done
        if current_section == 'summary' and current_text:
            sections['summary'] = ' '.join(current_text).strip()
        
        # Ensure we have some content
        if not sections['summary']:
            sections['summary'] = content[:500] if len(content) > 500 else content
        
        if not sections['insights']:
            sections['insights'] = ["Analysis completed - see full response for details"]
        
        if not sections['actions']:
            sections['actions'] = [{"title": "Review full analysis", "priority": "high", "description": "Review the complete analysis for detailed recommendations"}]
        
        return {
            "timeframe": timeframe,
            "analysis_summary": sections['summary'],
            "key_insights": sections['insights'][:5],  # Limit to 5
            "action_items": sections['actions'][:10],  # Limit to 10
            "predicted_outcomes": {
                "revenue_impact": "See detailed analysis",
                "customer_impact": "See detailed analysis",
                "pipeline_impact": "See detailed analysis"
            },
            "risks_and_challenges": sections['risks'][:5],  # Limit to 5
            "generated_at": datetime.utcnow().isoformat(),
            "full_response": content  # Include full response for reference
        }

    def ask_question(self, question: str, analytics_data: dict) -> str:
        """
        Ask a free-form question about the CRM data
        
        Args:
            question: User's question
            analytics_data: Current CRM analytics
        
        Returns:
            AI response as a string
        """
        crm_data_formatted = self._format_crm_data(analytics_data)
        
        messages = [
            SystemMessage(content=f"""You are a helpful CRM analyst assistant. 
You have access to the following business data:

{crm_data_formatted}

Answer questions clearly and concisely, referencing specific data points when relevant.
If you don't have enough information to answer accurately, say so."""),
            HumanMessage(content=question)
        ]
        
        try:
            response = self.llm.invoke(messages)
            return response.content
        except Exception as e:
            return f"I apologize, but I encountered an error processing your question: {str(e)}"
