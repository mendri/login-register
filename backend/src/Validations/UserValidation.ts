import { z } from "zod";
import IUser from "../Interfaces/IUser";

const userObject = z.object({
    email: z.string().email({ message: "Email mal formatado" }),
    password: z.string().min(8, { message: "Senha muito curta, no mínimo 8" })
});

function UserValidation(req: IUser) {
    userObject.parse(req);
}

export default UserValidation;