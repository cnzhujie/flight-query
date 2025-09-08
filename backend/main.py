from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Flight Query API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class FlightQueryParams(BaseModel):
    dcity: str
    acity: str
    date: str
    type: Optional[str] = "oneway"
    returnDate: Optional[str] = None

class Flight(BaseModel):
    airline: str
    flightNo: str
    plane: str
    departure: str
    arrival: str
    departureTime: str
    arrivalTime: str
    punctuality: str
    price: float
    discount: float

class FlightResponse(BaseModel):
    reason: str
    result: dict
    error_code: int

@app.get("/")
async def root():
    return {"message": "Flight Query API is running"}

@app.get("/api/flights")
async def get_flights(
    dcity: str = Query(..., min_length=3, max_length=3, description="Departure city IATA code"),
    acity: str = Query(..., min_length=3, max_length=3, description="Arrival city IATA code"),
    date: str = Query(..., description="Departure date in YYYY-MM-DD format")
):
    """
    Search for flights based on departure, arrival, and date
    """
    api_key = os.getenv("FLIGHT_API_KEY")
    api_url = os.getenv("FLIGHT_API_URL")
    
    if not api_key or not api_url:
        raise HTTPException(status_code=500, detail="API configuration missing")
    
    # 使用聚合数据API的正确参数名称
    params = {
        "key": api_key,
        "departure": dcity.upper(),  # 出发地城市码
        "arrival": acity.upper(),    # 目的地城市码
        "departureDate": date,       # 出发日期 YYYY-MM-DD
    }
    
    # 根据文档，flightNo和maxSegments是可选的
    # type参数在文档中没有提到，所以移除它
    
    try:
        response = requests.get(api_url, params=params, timeout=30)
        response.raise_for_status()
        data = response.json()
        
        if data.get("error_code") != 0:
            raise HTTPException(status_code=400, detail=data.get("reason", "API error"))
        
        # 转换聚合数据API响应格式以匹配前端期望的数据结构
        flight_info = data.get("result", {}).get("flightInfo", [])
        
        # 转换每个航班信息到前端期望的格式
        converted_flights = []
        for flight in flight_info:
            converted_flight = {
                "airline": flight.get("airline", ""),
                "flightNo": flight.get("flightNo", ""),
                "plane": "",  # 聚合数据API没有提供机型信息
                "departure": flight.get("departure", ""),
                "arrival": flight.get("arrival", ""),
                "departureTime": f"{flight.get('departureDate', '')} {flight.get('departureTime', '')}",
                "arrivalTime": f"{flight.get('arrivalDate', '')} {flight.get('arrivalTime', '')}",
                "punctuality": "",  # 聚合数据API没有提供准点率
                "price": flight.get("ticketPrice", 0),
                "discount": 0  # 聚合数据API没有提供折扣信息
            }
            converted_flights.append(converted_flight)
        
        # 返回前端期望的格式
        return {
            "reason": data.get("reason", ""),
            "result": {
                "list": converted_flights,
                "page": 1,
                "total": len(converted_flights)
            },
            "error_code": data.get("error_code", 0)
        }
        
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"External API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "flight-query-api"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)