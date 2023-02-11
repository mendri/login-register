import React, { useState } from "react";
import HTTP_REQUEST from "../axios/config";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";



function Login() {
    const [email, setEmaill] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const EMAIL_REGEX = /^[\w-/.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const IS_THE_FORM_CORRECTLY_TYPED = EMAIL_REGEX.test(email) && password.length >= 8;
    const NAVIGATE = useNavigate();

    async function handleLoginBtn() {
        try {
            const { data } = await HTTP_REQUEST.post("/login", { user: {
                email,
                password
            }});
            localStorage.setItem("token", JSON.stringify(data.token));
            return NAVIGATE("/home");
        } catch(e) {
            return setErrMessage(e.response.data.message);
        }
    }


    return(
        <section className="h-screen w-full flex justify-center items-center">
            <form className="w-1/2 h-4/5 flex flex-wrap justify-center items-center border-4 rounded-md shadow-xl" onClick={(e) => e.preventDefault()}>
                <p className="text-red-600">{ errMessage }</p>
                <label className="w-full m-4 text-center flex justify-between" htmlFor="login-email-input">
                    <p className="w-3/12">Email</p>
                    <input onChange={(e) => setEmaill(e.target.value)} className="w-9/12 border border-gray-300 rounded-md bg-gray-50" id="login-email-input" type="email"  data-testid="login-email-input"/>
                </label>
                <label className="w-full m-4 text-center flex justify-between" htmlFor="login-password-input">
                    <p className="w-3/12">Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} className="w-9/12 border border-gray-300 rounded-md bg-gray-50" id="login-password-input" type="password"  data-testid="login-password-input"/>
                </label>
                <div className="w-full flex flex-col justify-center items-center">
                    <button id="login-input-btn" disabled={!IS_THE_FORM_CORRECTLY_TYPED} onClick={handleLoginBtn} className="w-4/12 h-8 border rounded-md bg-teal-500 text-neutral-50 font-bold" data-testid="login-input-btn">Entrar</button>
                    <button onClick={() => NAVIGATE("/register")} className="w-4/12 h-8 mt-4 border rounded-md bg-orange-500 text-neutral-50 font-bold" data-testid="register-input-btn">Criar Conta</button>
                </div>
            </form>
        </section>
    );
}

export default Login;