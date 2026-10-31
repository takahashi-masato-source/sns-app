import { describe, it,expect, vi } from "vitest";
import { getSessionService } from "../services/getSessionService";
import { cookies } from "next/headers";
import { getSessionRepository } from "../repositories/getSessionRepository";
import { getUserRepository } from "../repositories/getUserRepository";

vi.mock("next/headers",()=>({
    cookies:vi.fn(),
}));
const mockGet = vi.fn();
const mockCookieStore={
    get:mockGet,
}as unknown as Awaited<ReturnType<typeof cookies>>;
vi.mock("../repositories/getSessionRepository",()=>({
    getSessionRepository:vi.fn(),
}));
vi.mock("../repositories/getUserRepository",()=>({
    getUserRepository:vi.fn(),
}));

describe("getSessionService",()=>{
    it("sessionIdがないならエラー",async()=>{
        vi.mocked(cookies).mockResolvedValue(mockCookieStore);
        await expect(
            getSessionService()
        ).resolves.toBeNull();
    })

    it("sessionがないならエラー",async()=>{
        vi.mocked(cookies).mockResolvedValue(mockCookieStore);
        mockGet.mockReturnValue({
            value: "test-session-id",
        });
        vi.mocked(getSessionRepository).mockResolvedValue(null);
        await expect(
            getSessionService()
        ).resolves.toBeNull();
    })

    it("user情報が取得できないならnullを返す",async()=>{
        vi.mocked(cookies).mockResolvedValue(mockCookieStore);
        mockGet.mockReturnValue({
            value: "test-session-id",
        });
        vi.mocked(getSessionRepository).mockResolvedValue(
            { id: "test-session-id", userId: 1 } 
        );
        vi.mocked(getUserRepository).mockResolvedValue(null)
        await expect(
            getSessionService()
        ).resolves.toBeNull();
    })

    it("正常にuser情報を取得できる", async () => {
        vi.mocked(cookies).mockResolvedValue(mockCookieStore);
        mockGet.mockReturnValue({
            value: "test-session-id",
        });
        vi.mocked(getSessionRepository).mockResolvedValue({
            id: "test-session-id",
            userId: 1
        });
        const mockUser = {
            id: 1,
            mail: "test@example.com",
            name: "user",
            passwordHash: "password",
            bio: ""
        };
        vi.mocked(getUserRepository).mockResolvedValue(mockUser);

        await expect(
            getSessionService()
        ).resolves.toEqual(mockUser);
    });
});