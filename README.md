# Civil-Registry-Server
This project is designed to manage certificate records using a Node.js server, Express, and a PostgreSQL database with Knex.js for migrations.
<br>
# Table of Contents
<ul>
  <li>Getting Started</li>
  <li>Prerequisites</li>
  <li>Installation</li>
  <li>Database Setup</li>
  <li>Running the Server</li>
</ul>

# Getting Started
Follow these instructions to get a copy of this project up and running on your local machine for development
<br>
## Prerequisites
Make sure you have the following installed:
<ul>
  <li>Node.js (v14 or higher) - <a href="https://nodejs.org/en">Download Node.js</a></li>
  <li>PostgreSQL (v12 or higher) - <a href="https://www.postgresql.org/download/">DownloadPostgreSQL</a></li>
  <li>Git (latest version) - <a href="https://git-scm.com/downloads">Download Git</a></li>
</ul>

<br>

# Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/zizaaa/Civil-Registry-IS-Server.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Civil-Registry-IS-Server
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
<br>

# Database Setup
1. Configure your PostgreSQL database:
   Create a PostgreSQL database and make sure you have a username and password ready.
2. Setup environment variables:
   Create a `.env` file at the root of your project and add the following variables. Replace the values with your   PostgreSQL credentials and database name:
   ```env
   PG_USER=postgres
   PG_HOST=localhost
   PG_DATABASE=your_db_name
   PG_PASSWORD=your_password
   PG_PORT=5000
   JWT_SECRET=your_secret_JWTpassword
   SECRET=your_secret_password
   NODE_ENV = 'development'
   CLIENT_URL = http://localhost:5173
   SERVER_URL = http://localhost:8000
   USER_EMAIL= your_email
   PSWRD_EMAIL= email_application_password
   ```
3. Run the migrations:
  To create the necessary tables in the database, execute the following command:
  ```bash
   npx knex migrate:latest
  ```
   This command will apply the latest migration files to your database, creating the required tables.
<br>

# Running the Server
1. Start the server:
   ```bash
   npm run dev
  ``` Your server should now be running on `http://localhost:3000`.

