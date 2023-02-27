import { useState } from 'react';
import { useEffect } from 'react';
import LoginRegister from '../auth/LoginRegister'
import { useContext } from "react";
import { UserContext } from "../userContext";
export function useLogin() {
    const [url, setUrl] = useState(initialUrl);
    const [options, setOptions] = useState(initialOptions);
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [login, setLogin] = useState("");

    let { authToken, setAuthToken } = useContext(UserContext);
    // localStorage = window.localStorage;

    setError(undefined);

    async function checkAuthToken() {
        try {
            if (localStorage.getItem(authToken)) {
                if (localStorage.getItem(authToken) == "") {
                    setAuthToken("")
                } else {
                    const { data, error, loading, setUrl } = useFetch("https://backend.insjoaquimmir.cat/api/user", {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            'Authorization': 'Bearer ' + localStorage.getItem(authToken),
                        },
                        method: "GET",
                    });
                    if (data.success) {
                        setAuthToken(localStorage.getItem(authToken))
                    }
                }
            }
        } catch (e) {
            setError(e);
        }
    }
    const doLogin = (formState) => {
        setError(undefined);

        try {
            const data = fetch("https://backend.insjoaquimmir.cat/api/login", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ formState })
            });
            const resposta =  data.json();
            if (resposta.success === true) {
                console.log(resposta)
                setAuthToken(resposta.authToken);
            }
            else setError(resposta.message);
        } catch {
            console.log("Error");
            alert("Catchch");
        };
    }
    useEffect(() => {
        checkAuthToken();
    }, [])



    return { data, error, login };
}