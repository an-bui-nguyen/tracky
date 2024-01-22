import { useState } from 'react'
import SignUpForm from './SignUpForm'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleFormChange = (e) => {
    if (e.target.id === 'loginUsername') {
      setUsername(e.target.value)
    } else if (e.target.id === 'loginPassword') {
      setPassword(e.target.value)
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login(username, password)
      console.log(user)
      navigate('/dashboard')      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="container px-4 py-5 my-2">
        <div className='row row-cols-1 row-cols-lg-2'>
          <div className='col col-lg-7 d-flex flex-column justify-content-center'>
            <div className='text-center col-lg-10'>
              <img className="d-block mb-2 mx-auto" src="./src/assets/logo_3.png" alt=""></img>
              <h1 className="display-5 fw-bold text-body-emphasis">Tracky</h1>
              <div className="">
                <p className="lead mb-4">Embark on a journey of self-improvement with Tracky, the ultimate habit-tracking experience designed to empower you to build positive routines and achieve your goals.</p>
              </div>
            </div>
          </div>
          <div className='col col-lg-5 py-lg-4'>
            <div className='card form-signin w-100 mx-auto' style={{ maxWidth: '400px' }}>
              <form onSubmit={handleLoginSubmit}>
                <div className="form-floating">
                  <input type="text" className="form-control" id="loginUsername" placeholder="username" onChange={handleFormChange} value={username}></input>
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                  <input type="password" className="form-control" id="loginPassword" placeholder="Password" onChange={handleFormChange} value={password} autoComplete='password'></input>
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-check text-start my-3 d-flex-wrap justify-content-between">
                  <div className='d-inline-block w-50'>
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"></input>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                    Remember me
                    </label>
                  </div>
                  <div className='d-inline-block text-end w-50'>
                    <a href="#">Forgot password?</a>
                  </div>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
              </form>
              <hr></hr>
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>

      <div className='text-start'>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
            📅
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis">Calendar Heatmap</h3>
              <p>Visualize your habits with our intuitive calendar heatmap, inspired by GitHub's contribution tracker. Effortlessly track your progress and identify trends over time.</p>
              <a href="#" className="btn btn-success">
                Sign-up
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
            🌈
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis">Customizable Colors</h3>
              <p>Make habit tracking a vibrant and personal experience by choosing colors that resonate with you. Each color represents a unique habit, turning your calendar into a canvas of accomplishments.</p>
              <a href="#" className="btn btn-success">
                Sign-up
              </a>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
            🚀
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis">Easy-to-Use Interface</h3>
              <p>Our user-friendly design ensures a seamless experience. Set up your habits in minutes, log your achievements effortlessly, and stay motivated with a glance at your personalized calendar.</p>
              <a href="#" className="btn btn-success">
                Sign-up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
// <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
// <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button>
// </div>

export default LandingPage