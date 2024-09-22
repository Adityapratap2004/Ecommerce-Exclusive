
# Exclusive

Exclusive is a full-stack e-commerce platform built using the MERN stack (MongoDB, Express, React, Node.js) along with Redux Toolkit for state management. The website allows users to browse and search products, filter them based on categories, price, and ratings, manage a shopping cart, authenticate users, process payments, and includes a comprehensive admin dashboard for managing products and orders.



## Features

- **Product Search & Filtering**: Search by product name or filter by categories, price range, and ratings.
- **Cart System**: Add items to the cart, update quantities, and remove products before checkout.
- **User Authentication**: Sign up, log in, log out, reset and forgot password functionality with secure user management.
- **Order Tracking**: Track the status of your orders post-purchase.
- **Payment Integration**: Secure online payment system.
- **Admin Dashboard**: Admins can add, update, and delete products, manage orders.
- **Responsive UI**: Mobile-friendly design using ShadCN UI and Tailwind CSS.
- **Pagination**: Efficient product listing with pagination support.

## Tech Stack

- **Frontend**: React, Redux Toolkit, ShadCN UI, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication for secure login and registration
- **Payment System**: Integrated with payment gateway (Stripe)
- **State Management**: Redux Toolkit

## Installation

Install my-project with npm

```bash
  git clone https://github.com/Adityapratap2004/Ecommerce-Exclusive
  cd Ecommerce-Exclusive
  
```
Install Backend and Frontend Dependencies

```bash
  npm install
  cd frontend && npm install
  
```
Run the project through root directory

```bash
  npm dev
  
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your config.env file present inside config folder which is in backend folder

`PORT`=

`DB_URI`=

`JWT_SECRET`=

`JWT_EXPIRES_TIME`=

`COOKIE_EXPIRES_TIME`=

`STRIPE_PUBLISHABLE_KEY`=

`STRIPE_SECRET_KEY`=

`SMTP_SERVICE`=

`SMTP_PASSWORD`=

`SMTP_EMAIL`=

`SMTP_HOST`=

`SMTP_PORT`=

`CLOUDINARY_NAME`=

`CLOUDINARY_API_KEY`=

`CLOUDINARY_API_SECRET`=


