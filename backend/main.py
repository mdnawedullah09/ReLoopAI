from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key) if api_key else None

app = FastAPI(
    title="ReLoopAI API",
    description="Turn everyday waste into practical business opportunities.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://re-loop-ai.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to ReLoopAI!",
        "status": "Backend is running",
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "project": "ReLoopAI",
    }




class WasteRequest(BaseModel):
    waste_type: str
    quantity: float
    unit: str = "kg"


@app.post("/api/analyze-waste")
def analyze_waste(request: WasteRequest):
    if client is None:
        return {
            "error": "Gemini API key nahi mili. Backend/.env check karo."
         }

    
    prompt = f"""
    You are ReLoopAI, an AI waste-management business advisor.

    Analyze this waste:
    Waste type: {request.waste_type}
    Quantity: {request.quantity} {request.unit}

    Suggest exactly 3 practical business opportunities.

    For each opportunity, provide:
    1. Business idea: a concise, actionable idea.
    2. Startup cost: estimated initial investment in Indian Rupees (INR).
    3. Selling price: estimated selling price per unit, specifying the unit.
    4. Expected profit: estimated profit per unit, specifying the unit.
    5. Explanation: briefly explain the business opportunity.

    Rules:
    - Use realistic estimates for the given waste type and quantity.
    - State assumptions where needed.
    - Profit means estimated selling price minus estimated per-unit production cost.
    - Do not present estimates as guaranteed market prices or profits.
    - Account for processing costs where reasonable.
    - Return exactly 3 opportunities in valid JSON format.
    - Use this JSON structure:
    {{
    "business_opportunities": [
        {{
        "business_idea": "Example idea",
        "startup_cost_inr": "Estimated range",
        "selling_price": "Estimated price and unit",
        "expected_profit": "Estimated profit and unit",
        "explanation": "Short explanation"
        }}
    ]
    }}
    """

    try:
        response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents=prompt,
            )

        
        raw_text = response.text.strip()

        # Remove Markdown code fences if Gemini includes them
        if raw_text.startswith("```"):
            raw_text = raw_text.split("\n", 1)[1]
            raw_text = raw_text.rsplit("```", 1)[0].strip()

        data = json.loads(raw_text)
        ideas = data["business_opportunities"]


        return {
            "waste_type": request.waste_type,
            "quantity": request.quantity,
            "unit": request.unit,
            "business_opportunities": ideas[:3],
        }

    except Exception as e:
         return {
            "error": f"Gemini AI analysis failed: {str(e)}"
        }