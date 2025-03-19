Here’s the updated `README.md` with **deployment on Vercel** for both frontend and backend.  

---

# **TrackFlow - Partner & Order Management System**  

TrackFlow is a **Partner & Order Management System** designed to streamline delivery partner assignments, order tracking, and performance metrics.  

## **🛠️ Tech Stack**  

- **Frontend & Backend:** Next.js (React, API Routes)  
- **Database:** MongoDB (MongoDB Atlas)  
- **UI Components:** shadcn/ui
- **Deployment:** Vercel (Frontend & Backend)  

---

## **📌 Features**  

- **Dashboard:** Active orders, partner availability  , orders and areas
- **Partners Management:** Partner profiles, status tracking  
- **Orders Management:** Order creation, status updates, tracking ,
- **Assignments:** Automated assignments, and key metrics

---

## **🚀 Setup & Installation**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/your-username/trackflow.git
cd trackflow
```

### **2️⃣ Install Dependencies**  
```sh
npm install
```

### **3️⃣ Environment Variables**  
Create a `.env` file in the root directory and add the required environment variables.  

```env
MONGO_URI=your_mongodb_connection_string
DB_NAME=your_db_name
METRICS_DEFAULT_NAME=metrics
```

---

## **🏃 Running the Application Locally**  

```sh
npm run dev
```
The app will be available at `http://localhost:3000`.  

---

## **🚀 Deployment on Vercel**  

### **1️⃣ Install Vercel CLI**  
```sh
npm install -g vercel
```

### **2️⃣ Login to Vercel**  
```sh
vercel login
```

### **3️⃣ Deploy the Project**  
```sh
vercel
```
- Follow the prompts to configure your project.  
- Your project will be deployed, and you will get a Vercel URL.  
