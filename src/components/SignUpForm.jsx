import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <>
      <button type="button" className="btn btn-success w-75 py-2 mx-auto" data-bs-toggle="modal" data-bs-target="#signUpModal">Sign-up</button>
      <div className="modal fade" id="signUpModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Sign up</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-2">
                  <input type="text" className="form-control" onChange={(e) => {setDisplayName(e.target.value)}} value={displayName} id="signUpDisplayName" placeholder="Display Name"></input>
                  <label htmlFor="floatingName">Display name</label>
                </div>
                <div className="form-floating mb-2">
                  <input type="text" className="form-control" onChange={(e) => {setUsername(e.target.value)}} value={username} id="signUpUsername" placeholder="Username"></input>
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating mb-2">
                  <input type="password" className="form-control" onChange={(e) => {setPassword(e.target.value)}} value={password} id="signUpPassword" placeholder="Password" autoComplete='password'></input>
                  <label htmlFor="floatingPassword"> New password</label>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-success">Sign-up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpForm