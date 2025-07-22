# TrackFlow - Smart Delivery Management System

<p align="center">
  <!-- BADGES -->
  <a href="https://github.com/devanshmayatra/smart-delivery-management-system/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/devanshmayatra/smart-delivery-management-system?style=for-the-badge" alt="License">
  </a>
  <a href="https://github.com/devanshmayatra/smart-delivery-management-system/issues">
    <img src="https://img.shields.io/github/issues/devanshmayatra/smart-delivery-management-system?style=for-the-badge" alt="Issues">
  </a>
  <a href="https://github.com/devanshmayatra/smart-delivery-management-system/stargazers">
    <img src="https://img.shields.io/github/stars/devanshmayatra/smart-delivery-management-system?style=for-the-badge" alt="Stars">
  </a>
</p>

<p align="center">
  A full-stack Order & Partner Management System designed to streamline delivery partner assignments, order tracking, and performance metrics in real-time.
</p>

<br />

<p align="center">
  <a href="https://smart-delivery-management-system-eight.vercel.app/">
    <img src="https://img.shields.io/badge/View%20Live%20Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo">
  </a>
</p>

<br />

<!-- SCREENSHOT/DEMO -->
<!--<p align="center">
  <img src="path/to/your/screenshot.png" alt="TrackFlow Dashboard Screenshot" width="800"/>
</p> -->

---

## ✨ Key Features

*   **📊 Interactive Dashboard:** A central hub to visualize active orders, available partners, and key operational metrics at a glance.
*   **🤝 Partner Management:** A complete CRUD system for managing partner profiles, including status tracking (active, inactive, on-delivery) and performance history.
*   **📦 Order Lifecycle Management:** Full control over the order process, including creation, real-time status updates, and detailed tracking from assignment to completion.
*   **⚙️ Automated Assignments:** A smart system for assigning available partners to new orders, optimizing for efficiency.

---

## 🛠️ Tech Stack & Architecture

This project utilizes a modern, monolithic architecture with Next.js handling both the frontend and backend, ensuring seamless data flow and a great developer experience.

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) 14 (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/), [React](https://reactjs.org/) |
| **Database** | [MongoDB](https://www.mongodb.com/) (with Mongoose & MongoDB Atlas) |
| **Backend** | Next.js API Routes |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   **Node.js**: v18.0 or later
*   **Package Manager**: `npm`, `yarn`, or `pnpm`
*   **Database**: A MongoDB Atlas account or a local MongoDB instance

### Installation

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/[YOUR-USERNAME]/trackflow.git
    cd trackflow
    ```

2.  **Install Dependencies**
    ```sh
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add your environment variables.

    ```env
    # Your MongoDB connection string
    MONGO_URI="your_mongodb_connection_string"

    # The name of the database to use
    DB_NAME="trackflow_db"

    # A default name for performance metrics collection (optional)
    METRICS_DEFAULT_NAME="metrics"
    ```

### Usage

Run the development server:
```sh
npm run dev
```

Open http://localhost:3000 in your browser to see the application running.

🌐 API Endpoints

The backend is served via Next.js API Routes. Here are the key endpoints:

Method	Endpoint	Description
GET	/api/partners	Fetches a list of all partners.
POST	/api/partners	Creates a new partner.
GET	/api/orders	Fetches all orders with status filters.
POST	/api/orders	Creates a new order.
PUT	/api/orders/[orderId]	Updates a specific order's status.
☁️ Deployment

This project is optimized for deployment on Vercel.

Simply connect your GitHub repository to Vercel and it will handle the build and deployment process automatically. Remember to set up the environment variables in your Vercel project settings.

![alt text](https://vercel.com/button)

🗺️ Roadmap

Feature 1: Real-time map-based tracking for orders.

Feature 2: Partner performance analytics and reporting.

Feature 3: User authentication and role-based access control.

See the open issues for a full list of proposed features (and known issues).

🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License

Distributed under the MIT License. See LICENSE.txt for more information.

📧 Contact

Your Name - https://www.linkedin.com/in/devansh-mayatra-713486319/

Project Link: https://github.com/devanshmayatra/trackflow
