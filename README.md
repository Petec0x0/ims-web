# ims-web
An Inventory Managment System for tracking inventory levels, orders, sales and deliveries.
======================================

Overview
--------

This is an Inventory Management System built with the MERN stack (MongoDB, Express, React, Node.js). This guide provides instructions for developers to run the application.

For Developers
--------------

### Prerequisites

*   Node.js
*   Docker (optional for Docker setup)
*   MongoDB (if not using Docker)

### Local Development Setup

1.  **Clone the Repository:**
    
        git clone <repository-url>
        cd <repository-directory>
        
    
2.  **Set Up Environment Variables:**
    
    Create a `.env` file in the root directory with the following content:
    
        DB_HOST=mongodb://localhost:27017/ims
        JWT_SECRET=your_jwt_secret_string
        
    
3.  **Install Dependencies:**
    
    Navigate to the `server` and `client` directories to install dependencies:
    
        cd server
        npm install
        cd ../client
        npm install
        
    
4.  **Build the Frontend:**
    
        cd client
        npm run build
        mv build ../server/client
        
    
5.  **Run the Application:**
    
    Open two terminal windows. In the first terminal, run the backend:
    
        cd server
        npm start
        
    
    In the second terminal, run the frontend:
    
        cd client
        npm start
        
    
6.  **Access the Application:**
    
    Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
    

### Docker Setup

1.  **Ensure Docker is Installed:**
    
    Download and install Docker from [Docker's website](https://www.docker.com/get-started).
    
2.  **Create Secret Files:**
    
    Create secret files for the database host and JWT secret:
    
        echo "mongodb://mongo:27017/ims" > secrets/db_host.txt
        echo "your_jwt_secret_string" > secrets/jwt_secret.txt
        
    
3.  **Build and Run Docker Containers:**
    
        docker-compose up --build
    
4.  **Access the Application:**
    
    Open your browser and navigate to [http://localhost:5000](http://localhost:3000).
    

Support
-------

For any issues, please contact ...