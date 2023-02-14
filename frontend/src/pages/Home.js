import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [userEmail, setUserEmail] = useState("");
    const NAVIGATE = useNavigate();

    useEffect(() => {
        const USER = JSON.parse(localStorage.getItem("user"));

        if (!USER) {
            NAVIGATE("/");
        }

        setUserEmail(USER.email);
    }, [NAVIGATE]);

    function handleLogout() {
        localStorage.removeItem("user");
        NAVIGATE("/");
    }

    return (
        <section className="flex flex-col justify-center items-center">
            <p data-testid="user-email" className="text-center">{`${userEmail}`}</p>
            <p data-testid="logged-message" className="text-center">Parabéns você está logado</p>
            <button className="p-2 border w-24 bg-amber-800 rounded-md text-white font-extrabold" onClick={handleLogout}>Deslogar</button>
        </section>
    );
}

export default Home;