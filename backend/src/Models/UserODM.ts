import { model, Schema, models, Model } from "mongoose";
import IUser from "../Interfaces/IUser";

class UserODM {
    private schema: Schema;
    private model: Model<IUser>;

    constructor() {
        this.schema = new Schema<IUser>({
            email: { type: String, required: true },
            password: { type: String, required: true }
        });
        this.model = models.User || model("User", this.schema);
    }

    public async createUser(email: string, hashPass: string): Promise<void> {
        await this.model.create({email, password: hashPass});
    }

    public async readAllUsers(): Promise<IUser[]>{
        return this.model.find();
    }

    public async readUserByEmail(email: string): Promise<IUser | null>{
        return this.model.findOne({email}, {"__v": false,});
    }
}

export default UserODM;