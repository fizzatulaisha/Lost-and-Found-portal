# Lost & Found Portal

A full-stack web application designed to help students report and find lost or found items through a centralized platform.

**Live Demo:** https://lost-and-found-portal-tau.vercel.app

**GitHub:** https://github.com/fizzatulaisha/Lost-and-Found-portal

## Features

- User registration, login and logout
- Password hashing with bcrypt
- Session-based authentication
- Report lost and found items
- Upload and display item images
- Browse reported items
- Edit and delete personal reports
- Ownership-based authorization
- Form validation and error handling
- Success and error flash messages
- Email functionality using Nodemailer
- MongoDB database integration
- Cloudinary image storage
- Responsive web interface

## Functionality

### Authentication
Users can create accounts and log in securely. Passwords are hashed using bcrypt, while sessions keep track of authenticated users.

### Item Management
Users can create, view, update and delete their own lost/found item reports. Each report contains details such as name, category, status, date, location, description, contact information and image.

### Ownership & Authorization
Every item is associated with its creator. Before editing or deleting an item, the application verifies that the logged-in user is its owner.

### Image Uploads
Multer processes uploaded images and Cloudinary stores them in the cloud. The resulting image URL is saved in MongoDB, allowing images to remain available after deployment.

### Email Notifications
Nodemailer is used to provide email functionality for sending notifications through the application's email system.

### Database
MongoDB with Mongoose is used to store users and item reports. MongoDB Atlas is used for the deployed application.

## Tech Stack

**Frontend:** HTML, CSS, JavaScript, EJS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose, MongoDB Atlas  
**Authentication:** Express Session, bcrypt, Connect Flash  
**File Uploads:** Multer, Cloudinary  
**Email:** Nodemailer  
**Deployment:** Vercel  
**Version Control:** Git, GitHub

## Project Structure

```text
Lost-and-Found-portal/
├── config/
├── middleware/
├── models/
├── routes/
├── public/
├── views/
├── app.js
├── package.json
└── README.md

Run Locally
git clone https://github.com/fizzatulaisha/Lost-and-Found-portal.git
cd Lost-and-Found-portal
npm install

Create a .env file with your MongoDB, session and Cloudinary credentials, then run:
npm start

Open:
http://localhost:3000


Future Improvements
Search items by name
Admin dashboard
Item claiming functionality


Author
Fizza tul Aisha
BS Information Technology — PUCIT