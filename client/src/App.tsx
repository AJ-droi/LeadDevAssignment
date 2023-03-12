import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import DataProvider from './pages/context/authcontext';
import Home from './pages/Home';
import Seller from './pages/Seller';
import { ToastContainer } from "react-toastify";
import Edit from './pages/Edit';
import { ProtectRoute } from './pages/context/ProtectedRoute';


function App() {

  return (
    <div >
      <DataProvider>
      <ToastContainer />
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/seller' element={ <ProtectRoute><Seller /></ProtectRoute>} />
            <Route path='/seller/:productId' element={ <ProtectRoute><Seller /></ProtectRoute>} />
            <Route path='/edit' element={ <ProtectRoute><Edit /></ProtectRoute>} />
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
