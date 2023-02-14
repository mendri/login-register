import React from "react";
import userEvent from "@testing-library/user-event";
import { waitFor, screen } from "@testing-library/react";
import renderWithRouter from "./renderWithRouter";
import HTTP_REQUEST from "../../axios/config";
import App from "../../App";

describe("Testa a página de registro", () => {
    it("Confere se todos os elementos são renderizados na tela de registro", async () => {
        renderWithRouter(<App />, "/register");
      
        const REGISTER_EMAIL_INPUT = screen.getByTestId("register-email-input");
        const REGISTER_PASSWORD_INPUT = screen.getByTestId("register-password-input");
        const REGISTER_INPUT = screen.getByTestId("register-input-btn");
        const LOGIN_INPUT = screen.getByTestId("login-input-btn");

        expect(REGISTER_EMAIL_INPUT).toBeInTheDocument();
        expect(REGISTER_PASSWORD_INPUT).toBeInTheDocument();
        expect(REGISTER_INPUT).toBeInTheDocument();
        expect(REGISTER_INPUT).toBeDisabled();
        expect(LOGIN_INPUT).toBeInTheDocument();
    });

    it("Confere se ao fazer um register correto a aplicação redireciona corretamente", async () => {
        const { history } = renderWithRouter(<App />, "/register");

        const REGISTER_EMAIL_INPUT = screen.getByTestId("register-email-input");
        const REGISTER_PASSWORD_INPUT = screen.getByTestId("register-password-input");
        const REGISTER_INPUT = screen.getByTestId("register-input-btn");

        userEvent.type(REGISTER_EMAIL_INPUT, "emailnaocadastrado@email.com");
        userEvent.type(REGISTER_PASSWORD_INPUT, "senhatotalsegura123");

        expect(REGISTER_INPUT).not.toBeDisabled();

        jest.spyOn(HTTP_REQUEST, "post").mockResolvedValueOnce({ data: { token: "opdsganrh4156465" }});
      
        userEvent.click(REGISTER_INPUT);

        await waitFor(() => {
            expect(history.pathname).toBe("/home");
        });

        const LOGGED_MESSAGE = screen.getByTestId("logged-message");
        expect(LOGGED_MESSAGE).toBeInTheDocument();
    });
});