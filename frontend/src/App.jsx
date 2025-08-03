import { Route, Routes } from 'react-router-dom'
import './App.css'

import Register from './components/Register'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/Protected'
import Login from './components/Login'

function App() {

  return (
    <Routes> 
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={
        <ProtectedRoute> 
          <Dashboard />
        </ProtectedRoute>
        } />
    </Routes>
  )
}

export default App
