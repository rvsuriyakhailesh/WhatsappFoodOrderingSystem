from pydantic import BaseModel, Field
from typing import List, Optional
from app.models import OrderStatus

class MenuCreate(BaseModel):
    name: str
    description: Optional[str] = ""
    price: float
    available: bool = True

class MenuRead(MenuCreate):
    id: int

class OrderItem(BaseModel):
    item_id: int
    quantity: int = 1  

class OrderCreate(BaseModel):
    customer_name: str
    whatsapp_number: str = Field(..., example="+919999999999")
    items: List[OrderItem]   

class OrderRead(BaseModel):
    id: int
    customer_name: str
    whatsapp_number: str
    items: List[OrderItem]  
    status: OrderStatus

class OrderStatusUpdate(BaseModel):
    status: OrderStatus
