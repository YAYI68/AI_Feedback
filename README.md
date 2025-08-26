# Project Setup Guide

This guide will walk you through setting up and running the Ai feedback full-stack application, which includes a NestJS backend and a React frontend.

---

### **1. Prerequisites**

Before you begin, ensure you have the following installed on your machine:

* **Node.js**: It's recommended to use a version of Node.js 16 or later.
* **npm** or **yarn**: A package manager for installing project dependencies. `npm` comes with Node.js.
* **PostgreSQL**: A local instance of PostgreSQL is required for the backend database. Make sure it's running.

---

### **2. Backend Setup (NestJS)**

Navigate to the `backend` directory in your terminal.

1.  **Install Dependencies**

    Run the following command to install all the required packages for the backend:

    ```bash
    npm install
    ```

2.  **Configure Environment Variables**

    Create a file named `.env` in the `backend` directory and add the following content. This configures the database connection and the AI gateway.

    ```dotenv
    NODE_ENV=development

    # For Postgressql db
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=password
    DB_DATABASE=feedback

    # Third Party Provider openai or gemini
    AI_GATEWAY_PROVIDER="gemini"
    OPENAI_API_KEY="your_openai_key"
    GEMINI_API_KEY="your_gemini_key"
    ```

    **Note:** Replace `"your_openai_key"` and `"your_gemini_key"` with your actual API keys.

3.  **Run the Backend**

    Start the NestJS backend server with the following command:

    ```bash
    npm run start:dev
    ```

    The backend will run on `http://localhost:3000` by default.

---

### **3. Frontend Setup (React with Vite)**

Open a **new terminal window** and navigate to the `frontend` directory.

1.  **Install Dependencies**

    Run the following command to install all the required packages for the frontend:

    ```bash
    npm install
    ```

2.  **Configure Environment Variables**

    Create a file named `.env` in the `frontend` directory. This file is used by Vite to configure the API endpoint.

    ```dotenv
    VITE_API_BASE_URL=http://localhost:3000
    ```

    The `VITE_API_BASE_URL` variable tells your React app where to find the backend API.

3.  **Run the Frontend**

    Start the React development server:

    ```bash
    npm run dev
    ```

    The frontend will typically run on `http://localhost:5173` (or a different port if that one is in use).

---

### **4. Running the Full-Stack Application**

* Ensure you have two separate terminal windows open.
* In the first, run the backend using `npm run start:dev` from the `backend` directory.
* In the second, run the frontend using `npm run dev` from the `frontend` directory.

Once both servers are running, you can access your application in a web browser by navigating to the frontend URL.