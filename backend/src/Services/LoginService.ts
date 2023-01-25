import IUser from "../Interfaces/IUser";
import UserODM from "../Models/UserODM";

class LoginService {
    private model: UserODM;

    constructor() {
        this.model = new UserODM();
    }

    public async handleLoginService(): Promise<IUser[]> {
        const user = await this.model.readAllUsers();
        return user;
    }
}

export default LoginService;