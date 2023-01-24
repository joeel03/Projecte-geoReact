import React from 'react'
import { useContext } from "react";
import { UserContext } from "../userContext";

const Footer = () => {  
  let { authToken, setAuthToken } = useContext(UserContext);

  return (
    <div>
       SOY EL FOOTER.
    </div>
  )
}

export default Footer
