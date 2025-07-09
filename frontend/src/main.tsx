import { StrictMode } from 'react'
import * as ReactDom from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Chat from './pages/Chat'

const router=createBrowserRouter([
  {
    path:'/chats',
    element: <Chat />
  },
  {
    path:'/signup',
    element: <Signup />
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/profile',
    element: <Profile />
  }
])

ReactDom.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
