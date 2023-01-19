import React from 'react'

const Register = ({ setLogin }) => {
  return (
    <div>

      <form>

        <div className="form-outline mb-4">
          <input type="text" id="form3Example1cg" className="form-control form-control-lg" />
          <label className="form-label" for="form3Example1cg">Your Name</label>
        </div>

        <div className="form-outline mb-4">
          <input type="email" id="form3Example3cg" className="form-control form-control-lg" />
          <label className="form-label" for="form3Example3cg">Your Email</label>
        </div>

        <div className="form-outline mb-4">
          <input type="password" id="form3Example4cg" className="form-control form-control-lg" />
          <label className="form-label" for="form3Example4cg">Password</label>
        </div>

        <div className="form-outline mb-4">
          <input type="password" id="form3Example4cdg" className="form-control form-control-lg" />
          <label className="form-label" for="form3Example4cdg">Repeat your password</label>
        </div>

        <div className="form-check d-flex justify-content-center mb-5">
          <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
          <label className="form-check-label" for="form2Example3g">
            I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
          </label>
        </div>

        <div className="d-flex justify-content-center">
          <button type="button"
            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
        </div>

        <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
            onClick={() => {
              setLogin(true)
            }}
          >Login here</a></p>

      </form>

    </div>

  )
}

export default Register
