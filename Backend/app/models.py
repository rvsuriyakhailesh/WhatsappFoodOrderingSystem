from sqlmodel import SQLModel, Field
from typing import Optional, List, Dict
from sqlalchemy import Column, JSON, String
from enum import Enum

class OrderStatus(str, Enum):
    pending = "pending"
    preparing = "preparing"
    out_for_delivery = "out-for-delivery"
    delivered = "delivered"
    canceled = "canceled"

class MenuItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: Optional[str] = ""
    price: float
    available: bool = True

class Order(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    customer_name: str
    whatsapp_number: str
  
    items: List[Dict[str, int]] = Field(
        sa_column=Column(JSON), 
        default=[]
    )
    status: OrderStatus = Field(
        sa_column=Column(String), 
        default=OrderStatus.pending.value
    )
