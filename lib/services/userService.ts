//アカウント登録をするService
//入力されたnameとmailとpasswordに不備がないかを確認してパスワードをハッシュ化しDBにアカウントを作るuserRepositoryを呼び出す

import { userRepository } from "@/lib/repositories/userRepository";
import { hash} from 'bcryptjs';

export async function userService(
    name:string,
    mail:string,
    password:string,
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