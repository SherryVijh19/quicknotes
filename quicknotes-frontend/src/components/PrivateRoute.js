import React from 'react';
import {Route,Navigate} from 'react-router-dom';

export default function PrivateRoute({element:Component, ...rest}){
    const token=localStorage.getItem('token');
    return token?<Route{...rest} element={<Component/>}/>:<Navigate to="/login"/>;
}