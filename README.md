TrackFlow - Smart Delivery Management System

TrackFlow is a full-stack Order & Partner Management System designed to streamline delivery partner assignments, order tracking, and performance metrics in real-time.

<br />

<p align="center">
<a href="https://smart-delivery-management-system-eight.vercel.app/">
<img src="https://img.shields.io/badge/View%20Live%20Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo">
</a>
</p>

<br />

<!--
**PRO TIP:** Add a high-quality GIF or screenshot of your application here to make your README even more impressive.
<p align="center">
<img src="path/to/your/screenshot.png" alt="TrackFlow Dashboard Screenshot" width="800"/>
</p>
-->

⭐ Key Features

📊 Interactive Dashboard: A central hub to visualize active orders, available partners, and key operational metrics at a glance.

🤝 Partner Management: A complete CRUD system for managing partner profiles, including status tracking (active, inactive, on-delivery) and performance history.

📦 Order Lifecycle Management: Full control over the order process, including creation, real-time status updates, and detailed tracking from assignment to completion.

⚙️ Automated Assignments: A smart system for assigning available partners to new orders, optimizing for efficiency.

🛠️ Tech Stack & Architecture

This project utilizes a modern, monolithic architecture with Next.js handling both the frontend and backend, ensuring seamless data flow and a great developer experience.

Category	Technology
Framework	Next.js 14 (App Router)
Language	TypeScript
Styling	Tailwind CSS
UI	shadcn/ui, React
Database	MongoDB (with Mongoose & MongoDB Atlas)
Backend	Next.js API Routes
Deployment	Vercel
🚀 Getting Started

Follow these instructions to set up and run the project locally.

Prerequisites

Node.js (v18 or later)

npm or yarn

A MongoDB Atlas account or a local MongoDB instance

1. Clone the Repository
Generated sh
git clone https://github.com/your-username/trackflow.git
cd trackflow

2. Install Dependencies
Generated sh
npm install
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Sh
IGNORE_WHEN_COPYING_END
3. Configure Environment Variables

Create a .env.local file in the root directory and add the following variables.

Generated env
# Your MongoDB connection string
MONGO_URI=your_mongodb_connection_string

# The name of the database to use
DB_NAME=trackflow_db

# A default name for performance metrics collection (optional)
METRICS_DEFAULT_NAME=metrics
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Env
IGNORE_WHEN_COPYING_END
4. Run the Development Server```sh

npm run dev

Generated code
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## **🌐 API Endpoints**

The backend is served via Next.js API Routes. Here are some of the key endpoints:

| Method | Endpoint               | Description                             |
| :----- | :--------------------- | :-------------------------------------- |
| `GET`  | `/api/partners`        | Fetches a list of all partners.         |
| `POST` | `/api/partners`        | Creates a new partner.                  |
| `GET`  | `/api/orders`          | Fetches all orders with status filters. |
| `POST` | `/api/orders`          | Creates a new order.                    |
| `PUT`  | `/api/orders/[orderId]`| Updates a specific order's status.      |

---

## **☁️ Deployment**

This project is optimized for deployment on **Vercel**. Simply connect your GitHub repository to Vercel and it will handle the build and deployment process automatically, including setting up the environment variables.
