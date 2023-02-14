import bcrypt from "bcryptjs";
import generateToken from "../Helpers/JWT";
import StatusCodes from "../Helpers/StatusCodes";
import IError from "../Interfaces/IError";
import IUser from "../Interfaces/IUser";
import UserODM from "../Models/UserODM";

class LoginService {
    private model: UserODM;

    constructor() {
        this.model = new UserODM();
    }
    
    public async handleLoginService(reqUser: IUser) {
        const { email, password } = reqUser;
            
        const user = await this.verifyIfUserExistsByEmail(email);
        await this.verifyEncryptedPass(password, user.password);
            
        const token = generateToken(email);
        return { token, email };
    }

    private async verifyIfUserExistsByEmail(email: string) {
        const user = await this.model.readUserByEmail(email);

        if (!user) {
            const error = new Error("Não existe usuário com este email") as IError;
            error.status = StatusCodes.NOT_FOUND;
            throw error;
        }

        return user;
    }

    private async verifyEncryptedPass(pass: string, hashPass: string): Promise<void> {
        const isValid = await bcrypt.compare(pass, hashPass);
        
        if (!isValid) {
            const error = new Error("Senha incorreta") as IError;
            error.status = StatusCodes.UNAUTHORIZED_STATUS;
            throw error;
        }
    }
}

export default LoginService;