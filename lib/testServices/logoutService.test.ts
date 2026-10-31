import { describe, it, expect, vi } from "vitest";
import { cookies } from "next/headers";
import { logoutService } from "../services/logoutService";
import { logoutRepository } from "../repositories/logoutRepository";

vi.mock("next/headers", () => ({
    cookies: vi.fn(),
}));

const mockGet = vi.fn();

const mockCookieStore = {
    get: mockGet,
    delete: vi.fn(),
} as unknown as Awaited<ReturnType<typeof cookies>>;

vi.mock("../repositories/logoutRepository",()=>({
    logoutRepository:vi.fn(),
}));

describe("logoutService", () => {
    it("sessionIdがないならエラー", async()=>{

        vi.mocked(cookies).mockResolvedValue(mockCookieStore);

        await expect(
            logoutService()
        ).rejects.toThrow("ログイン情報がない");
    });

    it("sessionがないならエラー",async()=>{
        vi.mocked(cookies).mockResolvedValue(mockCookieStore);
        mockGet.mockReturnValue({
            value: "test-session-id",
        });
        vi.mocked(logoutRepository).mockResolvedValue(
            null as unknown as Awaited<ReturnType<typeof logoutRepository>>
        )
        await expect(
            logoutService()
        ).rejects.toThrow("sessionがない")
    })

    it("正常にログアウトできる", async()=>{
        vi.mocked(cookies).mockResolvedValue(mockCookieStore);
        mockGet.mockReturnValue({
            value: "test-session-id",
        });

        vi.mocked(logoutRepository).mockResolvedValue(
            { id: "test-session-id", userId: 1 } 
        );

        await logoutService();
        expect(mockCookieStore.delete).toHaveBeenCalledWith("sessionId");
    });
});