import { useState } from 'react'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login'

function App() {

  return (
    <>
      <Routes>
        <Route path = "/" element = {<Navigate to = "/login" /> } />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/register" element = {<h1>Register</h1>} />
      </Routes>
    </>
  )
}

export default App
