import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import renderWithRouter from "./renderWithRouter";
import HTTP_REQUEST from "../../axios/config";

describe("Testa a página de", () => {
    it("Conferi se todos os elementos são renderizados na tela", async () => {
        renderWithRouter(<App />, "/login");
        
        const LOGIN_EMAIL_INPUT = screen.getByTestId("login-email-input");
        const LOGIN_PASSWORD_INPUT = screen.getByTestId("login-password-input");
        const LOGIN_INPUT = screen.getByTestId("login-input-btn");
        const REGISTER_INPUT = screen.getByTestId("register-input-btn");

        expect(LOGIN_EMAIL_INPUT).toBeInTheDocument();
        expect(LOGIN_PASSWORD_INPUT).toBeInTheDocument();
        expect(LOGIN_INPUT).toBeInTheDocument();
        expect(LOGIN_INPUT).toBeDisabled();
        expect(REGISTER_INPUT).toBeInTheDocument();
    });

    it("Conferi se ao fazer um login correto a aplicação redireciona corretamente", async () => {
        const { history } = renderWithRouter(<App />, "/login");

        const LOGIN_EMAIL_INPUT = screen.getByTestId("login-email-input");
        const LOGIN_PASSWORD_INPUT = screen.getByTestId("login-password-input");
        const LOGIN_INPUT = screen.getByTestId("login-input-btn");

        userEvent.type(LOGIN_EMAIL_INPUT, "emailjacadastrado@email.com");
        userEvent.type(LOGIN_PASSWORD_INPUT, "senhatotalsegura123");

        expect(LOGIN_INPUT).not.toBeDisabled();

        userEvent.click(LOGIN_INPUT);

        jest.spyOn(HTTP_REQUEST, "post").mockResolvedValueOnce({ token: "1234" });

        await waitFor(() => {
            expect(history.pathname).toBe("/home");
        });
    });
});