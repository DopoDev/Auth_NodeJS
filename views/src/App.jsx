import { useState } from 'react'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'

function App() {

  return (
    <>
      <Routes>
        <Route path = "/" element = {<Navigate to = "/login" /> } />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
      </Routes>
    </>
  )
}

export default App
