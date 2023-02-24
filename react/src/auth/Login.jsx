import React from 'react'
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useForm } from '../hooks/useForm';

const Login = ({ setLogin }) => {
  // let [email, setEmail] = useState("");
  // let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let { authToken, setAuthToken } = useContext(UserContext);

  const { formState, onInputChange } = useForm({

    email: "",
    
    password: "",
    
    });
  const {email,password} = formState 
  
  const sendLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ email: email, password: password })
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        console.log(resposta)
        setAuthToken(resposta.authToken);
        
      }
      else setError(resposta.message);
    } catch{
        console.log("Error");
        alert("Catchch");
      };
      // alert("He enviat les Dades:  " + email + "/" + password);

    };
  return (
    <div className="center">
      <form>
        <div className="form-outline mb-4">
          <input name="email" type="email" id="form2Example1" className="form-control" onChange={onInputChange}/>
          <label className="form-label" for="form2Example1">Email address</label>
        </div>

        <div className="form-outline mb-4">
          
          <input name="password" type="password" id="form2Example2" className="form-control" onChange={onInputChange}/>
          <label className="form-label" for="form2Example2">Password</label>
        </div>

        {/* <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
              <label className="form-check-label" for="form2Example31"> Remember me </label>
            </div>
          </div>

          <div className="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div> */}

        <button type="button" className="btn btn-primary btn-block mb-4" onClick={(e) => {
            sendLogin(e);
          }}>Sign in</button>
          {error? (<div>{error}</div>):(<></>) }

        <div className="text-center">
          <p>Not a member? <a href="#!"
            onClick={() => {
              setLogin(false)
            }}
          >Register</a></p>

        </div>
      </form>
    </div>
  )
}

export default Login
