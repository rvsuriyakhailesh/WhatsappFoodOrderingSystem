Food WhatsApp Ordering System

Through the use of WhatsApp messages, this project enables customers to place food orders.
The backend is built using FastAPI (Python), while the front end uses React and Bootstrap.

 Features:

Adding and managing menu items
Placing orders using WhatsApp
Viewing all current and canceled orders
Updating or canceling orders
Automatic WhatsApp messages using Twilio API

 Tech Stack:

Backend: Python, FastAPI, SQLModel, SQLite, Twilio API
Frontend: React Js, React Bootstrap
Database: SQLite (local file)
Dependencies / Downloads
1. Python
Version: 3.11 recommended
2. Node.js and npm
Node.js version: 22.x (or latest LTS)
npm version: 10.x (comes with Node.js)
3. Twilio Account
Needed for sending WhatsApp messages via the Twilio API
Sign up: https://www.twilio.com/
Collect: Account SID, Auth Token, WhatsApp Sandbox number
4. SQLite
Used as the local database
Usually comes pre-installed with Python
Optional GUI for checking database: DB Browser for SQLite
5. Required Python Packages
Installed via pip install -r requirements.txt
Key packages:
FastAPI
SQLModel
Twilio
python-dotenv
6. Required Node Packages
Installed via npm install in frontend folder
Key packages:
React
React Bootstrap
 Installation Instructions:

1. Clone the project:
git clone https://github.com/yourusername/WhatsappOrderingSystem.git
cd WhatsappOrderingSystem

2. Backend Setup:

Step 1: Go to the backend folder.
cd backend

Step 2: Create a virtual environment.
python -m venv venv

Step 3: Activate the environment.

For Windows:
venv\Scripts\activate

For Mac/Linux:
source venv/bin/activate

Step 4: Install dependencies:
pip install -r requirements.txt


Step 5: Configure .env file:
Inside the backend folder, create a file named .env and set its parameters as follows:

TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
WHATSAPP_FROM=whatsapp:+14155238886
DATABASE_URL=sqlite:///./app.db
 Collect your SID and Token from the Twilio Console.
  
Step 6: Run the backend server:
Python -m app.main.py
The backend runs at   http://127.0.0.1:8000
You can check the API docs here:
  http://127.0.0.1:8000/docs

3. Frontend Setup : 

Step 1: Navigate to the frontend folder
cd ../Frontend/whatsapp-food-frontend
Step 2: Install dependencies
npm install
Step 3: Run the frontend
npm start
Frontend runs on   http://localhost:3000

4. Connecting to Twilio WhatsApp Sandbox:
Go to the Twilio console > messaging > Try it out > Send a WhatsApp message.
You will receive a join code that looks like:   join lonely-bird
Send this code to +14155238886 from your WhatsApp.
 You will now start receiving WhatsApp messages from your application.

5. SDK / Python Client:
We have a Python SDK generated for the backend APIs. You can use it to test or integrate the app programmatically.
Installing the SDK
cd whatsapp_food_sdk
pip install -e .

6. Database:
SQLite database is used (app.db)
Orders now store items with quantity
Separate views for current and canceled orders
