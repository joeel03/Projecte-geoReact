import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {
  return (
    <div>
      <div className="mb-md-5 mt-md-4 pb-5">

        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
        <p className="text-black-50 mb-5">Please enter your login and password!</p>
        <div className="form-outline form-black mb-4">
        <label className="form-label" for="typeEmailX">Email</label>
          <input type="email" id="typeEmailX" className="form-control form-control-lg" />
        </div>

        <div className="form-outline form-black mb-4">
        <label className="form-label" for="typePasswordX">Password</label>
          <input type="password" id="typePasswordX" className="form-control form-control-lg" />
        </div>
        <button type="button" class="btn btn-primary btn-block mb-4">Login</button>
        <p className="small mb-5 pb-lg-2"><a className="text-black-50" href="#!">Forgot password?</a></p>
        <button className="mb-0">Don't have an account? <a href="#!" className="text-black-50 fw-bold">Sign Up</a></button>

      </div>
    </div>
  )
}

export default Login
