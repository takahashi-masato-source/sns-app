import { describe, it ,expect, vi } from "vitest";
import { loginService } from "../services/loginService";
import { loginResoritory } from "../repositories/loginResoritory";
import { compare } from "bcryptjs";

vi.mock("../repositories/loginResoritory",()=>({
    loginResoritory:vi.fn(),
}))
vi.mock("bcryptjs",()=>({
    compare: vi.fn(async()=>false),
}));

describe("loginService",()=>{
    it("passwordが空ならエラー",async()=>{
        await expect(
            loginService("test@example.com","")
        ).rejects.toThrow("passwordがない");
    });

    it("mailが空ならエラー",async()=>{
        await expect(
            loginService("","password")
        ).rejects.toThrow("mailがない");
    });

    it("アカウントが存在しなければエラー",async()=>{
        vi.mocked(loginResoritory).mockResolvedValue(null);

        await expect(
            loginService("test@example.com","password")
        ).rejects.toThrow("アカウントが見つからない");
    })

    it("passwordが違うならエラー",async()=>{
        vi.mocked(loginResoritory).mockResolvedValue({
            id: 1,
            name: "test",
            mail: "test@example.com",
            passwordHash: "hashed-password",
            bio: ""
        });
        vi.mocked(compare).mockImplementation(async () => false);

        await expect(
            loginService("test@example.com","password")
        ).rejects.toThrow("パスワードが違う");
    })
});