import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Expenses from './pages/Expenses';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route 
        path='/' 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
    </Routes>
  )
}

export default App