import { createContext, useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage, { style } from './components/HomePage'
import NavBar from './components/NavBar'
import { Router, RouterProvider } from 'react-router'
import { router } from './router'


function App() {
 
  return (
    <>
      <div style={{ height: '100vh', position: 'relative' }}>
        <RouterProvider  router={router} ></RouterProvider>
      </div>
    </>
  )
}

export default App
