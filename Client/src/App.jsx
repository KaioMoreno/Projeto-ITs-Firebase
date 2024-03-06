import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    
    <div className='div-app'>
      <ToastContainer/>
      <Outlet/>     
    </div>
  )
}

export default App
