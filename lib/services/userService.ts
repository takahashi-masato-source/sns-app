import { userRepository } from "@/lib/repositories/userRepository";
import { hash} from 'bcryptjs';

export async function userService(
    name:string,
    mail:string,
    password:string,
    bio:string,
){
    if (name === "") {
        throw new Error("nameがない");
    }

    if (mail === "") {
        throw new Error("mailがない");
    }

    if (password === "") {
        throw new Error("passwordがない");
    }
    const hashedPassword = await hash(password,10);
    const user = await userRepository(name,mail,hashedPassword);

    return user;
}