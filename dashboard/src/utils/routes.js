import React from 'react';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from './ProtectedRoute';



const routes = {
    "/": () => <ProtectedRoute component={Home} />,
    "/login": () => <Login />,
    "/signup": () => <Signup />,
   
}

export default routes;