import { StrictMode } from 'react'
import * as ReactDom from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router'
import SignupHome from './pages/SignupHome'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Chat from './pages/Chat'

const router=createBrowserRouter([
  {
    path:'/chats',
    element: <Chat />
  },
  {
    path:'/',
    element: <SignupHome />
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
