import bcrypt from "bcryptjs";
import IUser from "../Interfaces/IUser";
import UserODM from "../Models/UserODM";
import IError from "../Interfaces/IError";
import StatusCodes from "../Helpers/StatusCodes";
import generateToken from "../Helpers/JWT";

class RegisterService {
    private model: UserODM;

    constructor() {
        this.model = new UserODM();
    }

    public async handleRegister(user: IUser) {
        const { email, password } = user;
        await this.verifyIfUserExistsByEmail(email);
        const hashPass = await this.encryptThePassword(password);
        await this.saveInDatabase(email, hashPass);
        const token = generateToken(email);
        return { token, email };
    }

    private async verifyIfUserExistsByEmail(email: string) {
        const user = await this.model.readUserByEmail(email);

        if (user) {
            const error = new Error("Já existe um usuário com este email") as IError;
            error.status = StatusCodes.CONFLICT;
            throw error;
        }

        return user;
    }

    private async encryptThePassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        return hashPass;
    }

    private async saveInDatabase(email: string, hashPass: string) {
        await this.model.createUser(email, hashPass);
    }
}

export default RegisterService;