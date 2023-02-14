import React from "react";
// import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import renderWithRouter from "./renderWithRouter";
// import HTTP_REQUEST from "../../axios/config";
import App from "../../App";

describe("Testa a página home", () => {
    it("Confere se todos os elementos são renderizados na tela de registro", async () => {
        window.localStorage.setItem("user", JSON.stringify({ email: "emaillogado@gmail.com"}));
        renderWithRouter(<App />, "/home");

        const LOGGED_MESSAGE = screen.getByTestId("logged-message");
        const USER_EMAIL = screen.getByTestId("user-email");

        expect(USER_EMAIL).toBeInTheDocument();
        expect(LOGGED_MESSAGE).toBeInTheDocument();
    });
});