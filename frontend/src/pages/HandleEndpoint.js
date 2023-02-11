import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function HandleEndpoint() {
    const [isVerified, setIsVerified] = useState(false);
    const [isLogged, setIsLogged] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsVerified(true);
            return setIsLogged(true);
        }
        setIsVerified(true);
        return setIsLogged(false);
    }, []);

    return (
        isVerified
            ? isLogged
                ? (
                    <Navigate to="/home"/>
                )
                : (
                    <Navigate to="/login"/>
                )       
            : (<p>Loading...</p>)
    );
}

export default HandleEndpoint;