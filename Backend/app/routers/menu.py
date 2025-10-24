from fastapi import APIRouter, HTTPException
from typing import List

from app import crud
from app.schemas import MenuCreate, MenuRead

router = APIRouter(prefix="/menu", tags=["menu"])

@router.post("/", response_model=MenuRead)
def create_menu(item: MenuCreate):
    created = crud.create_menu_item(item.name, item.description, item.price, item.available)
    return created

@router.get("/", response_model=List[MenuRead])
def get_menu():
    return crud.list_menu_items()

@router.get("/{item_id}", response_model=MenuRead)
def get_menu_item(item_id: int):
    item = crud.get_menu_item(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item
