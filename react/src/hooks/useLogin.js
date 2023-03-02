import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";

export const useLogin = () => {
    const [error, setError] = useState("");
    let { setAuthToken } = useContext(UserContext);
    async function checkAuthToken() {
        try {
            let localAuthToken = localStorage.getItem("authToken")
            console.log(localAuthToken)
            if (localAuthToken) {

                const data = await fetch("https://backend.insjoaquimmir.cat/api/user", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + localAuthToken,
                    },
                    method: "GET",
                });
                const resposta =  await data.json();
                console.log(resposta)
                if (resposta.success) {
                    setAuthToken(localAuthToken)
                } else {
                    console.log("INVALID local storage auth token")
                    localStorage.removeItem("authToken")
                }
            } else {
                console.log("No auth token at local storage")
            }
        } catch (e) {
            setError(e);
        }
    }
    const doLogin = async (formState) => {
        setError("");   
        try {
            const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify( formState )
            });
            const resposta =  await data.json();
            if (resposta.success === true) {
                console.log(resposta)
                setAuthToken(resposta.authToken);
                localStorage.setItem("authToken",resposta.authToken)
            }
            else setError(resposta.message);
        } catch(e) {
            console.log(e.err);
            alert("Catchch");
        };
    }
    useEffect(() => {
        checkAuthToken();
    }, [])



    return { error, doLogin };
}