# How to install modules of the application:
-fork repository
-cd dashboard
-npm install
-cd ../
-cd backend
-npm install

# To run the backend
-cd backend
-create .env file and connect to your database by filling the following fields:

NODE_ENV= development
PORT=8000
USERNAME= -----
DATABASE=-------
DATABASE_PASSWORD=---------
JWT_SECRET= --------
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90  

-node server.js
-check out API documentation at https://documenter.getpostman.com/view/29191198/2sA3kSm2k2

# To run the react app
cd daashboard
npm start
