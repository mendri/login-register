import React from "react";

function Login() {
    return(
        <section className="h-screen w-full flex justify-center items-center">
            <form className="w-1/2 h-4/5 flex flex-wrap justify-center items-center border-4 rounded-md shadow-xl" onClick={(e) => e.preventDefault()}>
                <label className="w-full m-4 text-center flex justify-between" htmlFor="login-email-input">
                    <p className="w-3/12">Email</p>
                    <input className="w-9/12 border border-gray-300 rounded-md bg-gray-50" id="login-email-input" type="email"  data-testid="login-email-input"/>
                </label>
                <label className="w-full m-4 text-center flex justify-between" htmlFor="login-password-input">
                    <p className="w-3/12">Password</p>
                    <input className="w-9/12 border border-gray-300 rounded-md bg-gray-50" id="login-password-input" type="password"  data-testid="login-password-input"/>
                </label>
                <div className="w-full flex flex-col justify-center items-center">
                    <button disabled className="w-4/12 h-8 border rounded-md bg-teal-500 text-neutral-50 font-bold" data-testid="login-input-btn">Entrar</button>
                    <button className="w-4/12 h-8 mt-4 border rounded-md bg-orange-500 text-neutral-50 font-bold" data-testid="register-input-btn">Criar Conta</button>
                </div>
            </form>
        </section>
    );
}

export default Login;