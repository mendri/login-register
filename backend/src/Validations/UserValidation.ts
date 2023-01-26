import { z } from "zod";
import IError from "../Interfaces/IError";
import IUser from "../Interfaces/IUser";

class UserValidation {
    public static validate(user: IUser) {
        const userObject = z.object({
            email: z.string().email({ message: "Email mal formatado" }),
            password: z.string().min(8, { message: "Senha muito curta, no mínimo 8" })
        });

        const data = userObject.safeParse(user);

        if (!data.success) {
            const error = new Error(data.error.issues[0].message) as IError;
            error.status = 400;
            throw error;
        }
    }
}

export default UserValidation;