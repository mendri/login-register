import React from "react";
import { Route, Routes } from "react-router-dom";
import HandleEndpoint from "./pages/HandleEndpoint";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HandleEndpoint/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    );
}

export default App;
