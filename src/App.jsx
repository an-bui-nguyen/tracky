import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  Link,
  Route,
  Routes
} from 'react-router-dom'
import { LandingPage } from './components/LandingPage'
import { Header } from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </>
  )
}

export default App
