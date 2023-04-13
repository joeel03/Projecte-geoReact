import React from 'react'
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
//import { useForm } from '../hooks/useForm';

import { useForm } from "react-hook-form"; 

const Register = ({ setLogin }) => {
  let [formulari, setFormulari] = useState({});
   let [error, setError] = useState("");
  let { authToken, setAuthToken } = useContext(UserContext);

  const { register, handleSubmit , formState: { errors }} = useForm();

  const onSubmit = data => handleRegister(data)
  // const { formState, onInputChange } = useForm({
  //   name: "",
  //   password: "",
  //   password2: "",
  //   email: "",
  //   });
  // const {name, password, password2, email} = formState 
  
  
  // const handleChange = (e) => {
  //   e.preventDefault();

  //   setFormulari({
  //     ...formulari,
  //     [e.target.name]: e.target.value
  //   });
  // };
  const handleRegister = async (formState) => {
    let { name, password, password2, email } = formState;
    try{
      if (password2 !== password) {
        setError("Els passwords han de coincidir")
        return false;
      }
      const data = await fetch("https://backend.insjoaquimmir.cat/api/register", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        // Si els noms i les variables coincideix, podem simplificar
        body: JSON.stringify({ name, email, password })
      });
      const resposta = await data.json();
      if (resposta.success === true) {
        setAuthToken(resposta.authToken);
      }
      else {
        console.log(resposta.message)
        setError(resposta.message);}
    }catch{
      console.log("Error");
      alert("Catchch");
    };
  }
    return (
    <div className="center">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-outline mb-4">
        <label className="form-label" for="form3Example1cg">Your Name</label>

          <input  {...register("name", {
            required: "Aquest camp és obligatori",
            minLength: {
              value: 4,
              message: "El nom ha de contenir minim 4 caràcters"
            },
            pattern: {
              value: /^[a-zA-Z]+\s[a-zA-Z]+$/,
              message:
                "Has de escriure nom, espai, cognom"
            }

          })} 
          // name="name" type="text" id="form3Example1cg" 
          className="form-control form-control-lg" 
          // onChange={onInputChange} 
          />

        </div>
        {errors.name && <p>{errors.name.message}</p>}

        <div className="form-outline mb-4">
        <label className="form-label" for="form3Example3cg">Your Email</label>

          <input  {...register("email", {
            required: "Aquest camp és obligatori",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@insjoaquimmir\.cat$/,
              message:
                "El correu ha de ser de la organització insjoaquimmir.cat"
            }

          })} 
          // name="email" type="email" id="form3Example3cg" 
          className="form-control form-control-lg"
          //onChange={onInputChange} 
          />
          {errors.email && <p>{errors.email.message}</p>}

        </div>

        <div className="form-outline mb-4">
        <label className="form-label" for="form3Example4cg">Password</label>

          <input  {...register("password", {
            required: "Aquest camp és obligatori",
            minLength: {
              value: 8,
              message: "La contrasenya ha de tenir al menys 8 caràcters"
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
              message:
                "La contrasenya ha de contenir al menys una minúscula, una majúscula, un número i un caracter especial"
            }
          })} 
          //name="password"
           type="password" id="form3Example4cg"
          className="form-control form-control-lg" 
          //onChange={onInputChange} 
           />

          {errors.password && <p>{errors.password.message}</p>}
          
        </div>

        <div className="form-outline mb-4">
          <input {...register("password2")} 
          //name="password2" 
          type="password" id="form3Example4cdg" 
          className="form-control form-control-lg" 
          //onChange={onInputChange} 
          />
          <label className="form-label" for="form3Example4cdg">Repeat your password</label>
        </div>

        {/* <div className="form-check d-flex justify-content-center mb-5">
          <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
          <label className="form-check-label" for="form2Example3g">
            I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
          </label>
        </div> */}

        <div className="d-flex justify-content-center">
          <input type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" />
            {/* // onClick={(e) => {handleRegister(e);}} */}
        </div>
       {error? (<div>{error}</div>):(<></>) }
  
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
