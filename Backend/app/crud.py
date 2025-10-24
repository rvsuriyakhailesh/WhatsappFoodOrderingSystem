from app.database import get_session
from app.models import MenuItem, Order, OrderStatus
from typing import Dict, List, Optional

def create_menu_item(name: str, description: str, price: float, available: bool = True) -> MenuItem:
    with get_session() as session:
        item = MenuItem(name=name, description=description, price=price, available=available)
        session.add(item)
        session.commit()
        session.refresh(item)
        return item

def list_menu_items() -> List[MenuItem]:
    with get_session() as session:
        return session.query(MenuItem).all()

def get_menu_item(item_id: int) -> Optional[MenuItem]:
    with get_session() as session:
        return session.get(MenuItem, item_id)

def create_order(customer_name: str, whatsapp_number: str, items: List[Dict[str, int]]) -> Order:
    """
    items = [{"item_id": id, "quantity": qty}, ...]
    """
    with get_session() as session:
        order = Order(
            customer_name=customer_name,
            whatsapp_number=whatsapp_number,
            items=items,
            status=OrderStatus.pending.value
        )
        session.add(order)
        session.commit()
        session.refresh(order)
        return order

def get_order(order_id: int) -> Optional[Order]:
    with get_session() as session:
        order = session.get(Order, order_id)
        if order:
            order.items  
        return order

def list_orders() -> List[Order]:
    with get_session() as session:
        orders = session.query(Order).all()
        for order in orders:
            order.items  
        return orders


def update_order_status(order_id: int, new_status: str) -> Optional[Order]:
    with get_session() as session:
        order = session.get(Order, order_id)
        if not order:
            return None
        order.status = new_status
        session.add(order)
        session.commit()
        session.refresh(order)
        return order

def cancel_order(order_id: int) -> Optional[Order]:
    return update_order_status(order_id, OrderStatus.canceled.value)
