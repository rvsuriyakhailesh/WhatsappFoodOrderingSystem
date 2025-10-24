import pytest
from httpx import AsyncClient
from app.main import app
from unittest.mock import patch

@pytest.mark.asyncio
async def test_create_order_sends_whatsapp(tmp_path):
    with patch("app.whatsapp_client.send_whatsapp_message") as mock_send:
        async with AsyncClient(app=app, base_url="http://test") as ac:
            
            resp = await ac.post("/menu/", json={"name":"Paneer","description":"t","price":100,"available":True})
            assert resp.status_code == 200
            item = resp.json()
            resp = await ac.post("/orders/", json={"customer_name":"Ram","whatsapp_number":"+919999999999","item_ids":[item["id"]]})
            assert resp.status_code == 200
            mock_send.assert_called()
