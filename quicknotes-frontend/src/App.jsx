// import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import NotesList from './components/NotesList';
// import NoteForm from './components/NoteForm';
// import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
// import NoteForm from './components/NoteForm';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

function App(){
 
 return (
  // <BrowserRouter>
    <Routes>
      <Route path="/" element={<PrivateRoute element={NotesList} />} />
      <Route path="/add" element={<PrivateRoute element={NoteForm} />} />
      <Route path="/edit/:id" element={<PrivateRoute element={NoteForm} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  // </BrowserRouter>
 );
}

export default App;