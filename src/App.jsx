import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  Link,
  Route,
  Routes
} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className='mx-auto'>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
