import React from 'react'
import ReactDOM from 'react-dom/client'
import  router  from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import UserStatusContextProvider from './Context/Auth.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserStatusContextProvider>
      <RouterProvider router={router} />

    </UserStatusContextProvider>
    
  </React.StrictMode>,
)
