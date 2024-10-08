
# Backend Server IoT

## Description
This project is a backend server designed to support user authentication and manage IoT devices with CRUD operations. It connects to a PostgreSQL database for data storage and retrieval.

## Features
- User Authentication (JWT)
- CRUD operations for IoT devices
- PostgreSQL database integration
- Error handling and validation

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Tokens)
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/backend-server-iot.git
    cd backend-server-iot
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL=your_postgresql_database_url
    JWT_SECRET=your_jwt_secret
    ```

4. Set up database schemas:
    Use `/Public/Schemas.sql` file for create table in your protgresql database.

5. Start the server:
    ```bash
    npm start
    ```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

#### IoT Devices
- `GET /api/devices` - Get all devices
- `GET /api/devices/:id` - Get a single device by ID
- `POST /api/devices` - Create a new device
- `PUT /api/devices/:id` - Update a device by ID
- `DELETE /api/devices/:id` - Delete a device by ID
