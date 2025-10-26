from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import List

from app import crud
from app import whatsapp_client
from app.schemas import OrderCreate, OrderRead, OrderStatusUpdate
from app.models import OrderStatus, MenuItem

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("/", response_model=OrderRead)
def place_order(order_in: OrderCreate, background_tasks: BackgroundTasks):
    items_with_details = []

    for order_item in order_in.items:
        item = crud.get_menu_item(order_item.item_id)
        if not item:
            raise HTTPException(status_code=400, detail=f"Item id {order_item.item_id} not found")
        if not item.available:
            raise HTTPException(status_code=400, detail=f"Item '{item.name}' is not available")
        if order_item.quantity < 1:
            raise HTTPException(status_code=400, detail=f"Quantity for '{item.name}' must be >=1")
        items_with_details.append({"item_id": item.id, "quantity": order_item.quantity})

    order = crud.create_order(
        customer_name=order_in.customer_name,
        whatsapp_number=order_in.whatsapp_number,
        items=items_with_details
    )

    msg_lines = [f"{i['quantity']}x {crud.get_menu_item(i['item_id']).name}" for i in items_with_details]
    msg = f"Hi {order.customer_name}, your order #{order.id} is confirmed.\n" + "\n".join(msg_lines)
    background_tasks.add_task(whatsapp_client.send_whatsapp_message, order.whatsapp_number, msg)

    return order

@router.get("/", response_model=List[OrderRead])
def get_orders():
    return crud.list_orders()

@router.get("/{order_id}", response_model=OrderRead)
def get_order(order_id: int):
    order = crud.get_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.patch("/{order_id}", response_model=OrderRead)
def update_status(order_id: int, status_in: OrderStatusUpdate, background_tasks: BackgroundTasks):
    # Handle string or enum input
    status_value = status_in.status
    if isinstance(status_value, OrderStatus):
        status_value = status_value.value
    elif isinstance(status_value, str):
        status_value = status_value.lower().replace(" ", "-")
        if status_value not in [s.value for s in OrderStatus]:
            raise HTTPException(status_code=400, detail="Invalid status")
    else:
        raise HTTPException(status_code=400, detail="Invalid status")

    updated = crud.update_order_status(order_id, status_value)
    if not updated:
        raise HTTPException(status_code=404, detail="Order not found")

    msg = f"Order #{order_id} status updated to {status_value}"
    background_tasks.add_task(whatsapp_client.send_whatsapp_message, updated.whatsapp_number, msg)
    return updated


