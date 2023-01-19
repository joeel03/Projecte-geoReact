import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const Register = () => {
  return (
    <div>

      <div className="col-lg-10 mb-5 mb-lg-0 position-relative">

        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>

        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <div className="card bg-glass">
          <h2 className="fw-bold mb-3 text-uppercase">Register</h2>


          <form>

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="form-outline">
                  <label className="fw mb-2 text" for="form3Example1">First name</label>

                  <input type="text" id="form3Example1" className="form-control" />
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="form-outline">
                  <label className="form-label" for="form3Example2">Last name</label>

                  <input type="text" id="form3Example2" className="form-control" />
                </div>
              </div>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" for="form3Example3">Email address</label>

              <input type="email" id="form3Example3" className="form-control" />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" for="form3Example4">Password</label>

              <input type="password" id="form3Example4" className="form-control" />
            </div>

            <div className="form-check d-flex justify-content-center mb-4">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
              <label className="form-check-label" for="form2Example33">
                Subscribe to our newsletter
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Sign up
            </button>


          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
