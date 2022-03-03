import React from 'react';
import Nav from './Components/Nav/Nav';
import Main from './Components/Main';
import Register from './Components/Pages/Register';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
    <Nav />
    <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/register" element={<Register />} />
    </Routes>
    

    </>
  );
}

export default App;
