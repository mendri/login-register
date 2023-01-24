import { model, Schema } from "mongoose";
import IUser from "../Interfaces/IUser";

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const UserODM = model<IUser>("User", userSchema);

export default UserODM;