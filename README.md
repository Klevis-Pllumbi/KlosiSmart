# 🌐 KlosiSmart
A modern platform for local governance — focused on citizen–administration interaction, transparency, and digital public services.

---

## 🧾 About the Project
**KlosiSmart** is a web platform built for municipalities, designed to improve communication between citizens and local administration.  
It includes modules for news & events, surveys, interactive maps for citizen reports, file management, analytics, and an AI-powered virtual assistant.

The system uses clean layered architecture, is fully extensible, and integrates modern technologies such as AI, PDF generation, email broadcasting, geolocation, and more.

---

## ✨ Key Features

- 📰 News & Events with image galleries and documents  
- 📝 Dynamic Surveys + automatic generation via AI (OpenAI Structured Outputs)  
- 📊 Analytics & PDF export  
- 📂 File management (images/documents)  
- 📍 Citizen reports on interactive map (Leaflet)  
- 🤖 Virtual Assistant powered by OpenAI  
- 📬 Email broadcast with Outbox Pattern  
- 🔐 Secure authentication with JWT (USER/ADMIN roles)  
- 🐳 Docker-ready for easy deployment

---

## 🧱 Architecture

### **Frontend (Next.js)**
- Modern UI with React components  
- Dynamic form rendering (surveys, reports)  
- Map integration, charts, and DataTables  
- Session management using HttpOnly JWT cookies  

### **Backend (Spring Boot)**
- REST APIs for all modules  
- Spring Security + JWT  
- File storage, validation, and business logic  
- Integration with OpenAI & email services  
- Asynchronous email sending via Outbox worker  

### **Database**
- MySQL for structured data  
- Local file system for uploaded files (news, events, reports)

---

## 🧩 Core Modules (Summary)

### 📝 Surveys & AI
- Manual and AI-generated surveys  
- Question types: SINGLE / MULTIPLE / OPEN_TEXT  
- Dynamic survey form builder  
- Result visualizations + PDF export

### 📰 News & Events
- Grid layout with pagination  
- Main image + gallery + documents  
- Update & delete with controlled file handling  
- Public file serving with safe URL paths

### 📂 File Management
- Secure uploads (size/type validation)  
- UUID file naming  
- Folder-based structure for modules  

### 📍 Citizen Reports
- Category-based reporting form  
- Attachments (images/documents)  
- Location selection on the map  
- Admin map dashboard with filters  
- Report statistics by date & status

### 🤖 Virtual Assistant
- Powered by OpenAI gpt-4.1  
- Domain-specific chat for public services  
- Short-term conversation context per session

### 📬 Email Broadcast
- Outbox pattern with scheduled workers  
- Retry, backoff, and idempotency  
- Personalized HTML templates  

---

## 📸 Screenshots

#### Landing Page
<img width="100%" height="auto" alt="Landing Page" src="https://github.com/user-attachments/assets/03e4f110-db27-46e1-a63e-28bb66d0e387" />

#### Creating Survey
<img width="100%" height="auto" alt="Creating Survey" src="https://github.com/user-attachments/assets/96d7e2a1-0c93-48da-9afc-812b1ffddbd2" />

#### AI-generating
<img width="100%" height="auto" alt="AI-generating" src="https://github.com/user-attachments/assets/cbd6516b-af28-4b5f-8655-0f7e5493d181" />

#### Survey Statictics
<img width="100%" height="auto" alt="Survey Statictics" src="https://github.com/user-attachments/assets/dd06e782-4162-417a-9331-3588d1833660" />

#### News & Event Presentation
<img width="100%" height="auto" alt="News & Event Presentation" src="https://github.com/user-attachments/assets/22c485e8-5132-45f4-91a0-dfcea403ca55" />

#### News & Event Admin Managment
<img width="100%" height="auto" alt="News & Event Admin Managment" src="https://github.com/user-attachments/assets/d7c08669-26b2-4cd0-92ae-e5fd2512a25e" />

#### Report Form
<img width="100%" height="auto" alt="Report Form" src="https://github.com/user-attachments/assets/ea68c494-5f89-4c8a-b062-2f4f9c8b7725" />

#### Report Dashboard
<img width="100%" height="auto" alt="Report Dashboard" src="https://github.com/user-attachments/assets/ee95b8b6-0d9a-4ace-8a36-1ed2a723ad4e" />

#### Virtual Assistant
<img width="100%" height="auto" alt="Virtual Assistant" src="https://github.com/user-attachments/assets/f0ff268e-ade2-412e-aa4c-6fd042ceeb4f" />

---

## ⚙️ Setup & Local Development

### 1. Clone the repo
```bash
git clone https://github.com/<username>/<repo>.git
cd <repo>
```

### 2. Run with Docker
```bash
docker compose up --build
```

### 3. Environment Configuration
```bash
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/klosismart
SPRING_DATASOURCE_USERNAME=change_me
SPRING_DATASOURCE_PASSWORD=change_me
JWT_SECRET=change_me
OPENAI_API_KEY=change_me
```
