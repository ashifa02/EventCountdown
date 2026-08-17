# ⏳ Event Countdown Timer

A full-stack **Event Countdown Timer** web application that allows users to create, manage, and track their upcoming events with a live countdown. Each user can securely manage their own events through authentication.

## ✨ Features

- 🔐 User Registration
- 🔑 User Login & Logout
- ➕ Add new events
- ✏️ Edit existing events
- 🗑️ Delete events
- ⏱️ Live countdown timer
- 👤 User-specific events
- 🔄 Events persist after page refresh
- 📅 Automatically identifies ongoing and expired events
- 📱 Responsive React interface
- 🔗 React frontend connected to Django REST API

## 🛠️ Technologies Used

### Frontend

- React.js
- Vite
- JavaScript
- HTML
- CSS
- Axios

### Backend

- Python
- Django
- Django REST Framework
- SQLite

### Authentication

- Django authentication
- Token-based API authentication

## 📂 Project Structure

```text
EventCountdown/
│
├── events/
│   ├── manage.py
│   ├── events/
│   └── countdown/
│
├── frontend/
│   └── React/
│       ├── src/
│       ├── public/
│       ├── screenshots/
│       │   ├── Edit event.png
│       │   ├── Expired Events.png
│       │   ├── Login.png
│       │   ├── Ongoing Events.png
│       │   └── Register.png
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/ashifa02/EventCountdown.git
cd EventCountdown
```

### 2. Run the Django Backend

Navigate to the Django project:

```bash
cd events
```

Create and activate a virtual environment if required:

```bash
python -m venv venv
```

#### Windows

```bash
venv\Scripts\activate
```

Install the required packages:

```bash
pip install -r requirements.txt
```

Apply migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend will run at:

```text
http://127.0.0.1:8000/
```

### 3. Run the React Frontend

Open a **new terminal** and navigate to the React project:

```bash
cd frontend/React
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173/
```

## 📸 Screenshots

### 🔐 Register

![Register](/screenshots/Register.png)

### 🔑 Login

![Login](/screenshots/Login.png)

### ✏️ Edit Event

![Edit Event](/screenshots/EditEvent.png)

### ⏳ Ongoing Events

![Ongoing Events](/screenshots/OngoingEvents.png)

### ⌛ Expired Events

![Expired Events](/screenshots/ExpiredEvents.png)

## 🔄 Application Flow

```text
Register
   ↓
Login
   ↓
View Events
   ↓
Add Event
   ↓
Live Countdown
   ↓
Edit / Delete Event
   ↓
Events remain available after refresh
   ↓
Logout
```

## 🔒 User-Specific Data

Each authenticated user can access and manage their own events. Users cannot access events belonging to other users.

## 🎯 Project Objective

The objective of this project is to build a practical full-stack web application demonstrating:

- Frontend development using React
- Backend development using Django REST Framework
- API integration
- User authentication
- CRUD operations
- Real-time countdown functionality
- User-specific data management

## 👩‍💻 Author

**Ashifa**

GitHub: [ashifa02](https://github.com/ashifa02)

## 📄 License

This project is created for educational and learning purposes.
