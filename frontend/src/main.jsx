import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster 
          position='top-center'
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e1e2e',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '14px',
              padding: '12px 16px'
            }
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
