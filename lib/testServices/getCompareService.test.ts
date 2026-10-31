import { describe, it,expect, vi } from "vitest";
import { getCompareService } from "../services/getCompareService";
import { getSessionService } from "../services/getSessionService";
import { prisma } from "../prisma";

vi.mock("../services/getSessionService",()=>({
    getSessionService:vi.fn(),
}));
vi.mock("../prisma", () => ({
    prisma: {
        post: {
            findUnique: vi.fn(),
        },
    },
}));

const mockUser={
    id: 1,
    mail: "test@example.com",
    name: "user",
    passwordHash: "password",
    bio: ""
}

describe("getCompareService",()=>{
    it("user情報が取得できないならnullを返す",async()=>{
        vi.mocked(getSessionService).mockResolvedValue(null)
        await expect(
            getCompareService("id")
        ).resolves.toBeNull();
    });
    it("DB内にidにあう投稿がないならnullを返す",async()=>{
        vi.mocked(getSessionService).mockResolvedValue(mockUser)
        vi.mocked(prisma.post.findUnique).mockResolvedValue(null)
        await expect(
            getCompareService("id")
        ).resolves.toBeNull();
    });
    it("user.idとpost.userIdが違うならnullを返す",async()=>{
        vi.mocked(getSessionService).mockResolvedValue(mockUser)
        vi.mocked(prisma.post.findUnique).mockResolvedValue(
            {
                id:1,
                content:"content",
                userId:2,
                createdAt:new Date("2026-10-31T10:00:00"),
            }
        )
        await expect(
            getCompareService("id")
        ).resolves.toBeNull();
    });
    it("user.idとpost.userIdが同じなら正常に動く",async()=>{
        vi.mocked(getSessionService).mockResolvedValue(mockUser)
        vi.mocked(prisma.post.findUnique).mockResolvedValue(
            {
                id:1,
                content:"content",
                userId:1,
                createdAt:new Date("2026-10-31T10:00:00"),
            }
        )
        await expect(
            getCompareService("id")
        ).resolves.toEqual(mockUser);
    });
})