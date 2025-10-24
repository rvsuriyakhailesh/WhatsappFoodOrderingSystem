import os
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

TW_SID = os.getenv("TWILIO_ACCOUNT_SID")
TW_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
WHATSAPP_FROM = os.getenv("WHATSAPP_FROM")  



try:
    if TW_SID and TW_TOKEN:
        from twilio.rest import Client
        client = Client(TW_SID, TW_TOKEN)
    else:
        client = None
except Exception:
    client = None
    
def send_whatsapp_message(to: str, body: str) -> Dict[str, Any]:
    """
    Send a WhatsApp message using Twilio sandbox.
    `to` must be E.164 format: '+919999999999'
    """

    print(TW_SID, TW_TOKEN, WHATSAPP_FROM, client, "Karna")
    if not client:
        print(f"[WHATSAPP MOCK] body={body} to={to}")
        return {"status": "mocked", "body": body}

    to_whatsapp = f"whatsapp:{to}"
    from_whatsapp = WHATSAPP_FROM

    try:
        msg = client.messages.create(body=body, from_=from_whatsapp, to=to_whatsapp)
        print(f"[WHATSAPP SENT] SID={msg.sid} to={to_whatsapp}")
        return {"sid": msg.sid, "status": msg.status}
    except Exception as e:
        print(f"[WHATSAPP ERROR] to={to_whatsapp} error={e}")
        return {"status": "failed", "error": str(e)}
