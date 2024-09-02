# Addis_Music MERN Stack Project
https://github.com/user-attachments/assets/0cbc5de8-c27b-4916-a284-8fec1318faf0

## Overview

This is a full-stack music management system developed using the MERN stack (MongoDB, ExpressJS, ReactJS, Node.js). The project is fully dockerized and deployed, with the frontend hosted on Netlify and the backend on Render. It features user registration, music creation and management, filtering by genre, and various music-related statistics.

## Live Demo

- **Frontend (vercel)**: [View the Application](https://your-netlify-site-url.netlify.app)
## Features

- **User Registration**: Users can sign up, log in.
- **Music Management**: Create, list, update, and delete songs.
- **Filtering**: Filter music album, artist and tittle
- **Statistics**: View statistics related to songs, including counts .

## Project Structure

The project is divided into two main directories:

- **client**: Contains the React frontend.
- **server**: Contains the Express backend.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker**
- **Node.js** (for local development without Docker)
- **Git** (to clone the repository)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-project-name.git
cd your-project-name
  2 . Environment Variables
# Example .env file
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
  3. Run with Docker
cd your-project-name
docker-compose up --build


