from fastapi import FastAPI
from app.database import init_db
from app.routers import menu, orders
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="WhatsApp Food Ordering - Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(menu.router)
app.include_router(orders.router)

@app.on_event("startup")
def on_startup():
    init_db()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",  
        host="0.0.0.0",
        port=8000,
        reload=True  
    )
