import { describe, it, expect } from "vitest";
import { userService } from "@/lib/services/userService";

describe("userService", () => {
    it("nameが空ならエラーになる", async () => {
        await expect(
            userService("", "test@example.com", "password")
        ).rejects.toThrow("nameがない");
    });

    it("mailが空ならエラーになる", async () => {
        await expect(
            userService("Toru", "", "password")
        ).rejects.toThrow("mailがない");
    });

    it("passwordが空ならエラーになる", async () => {
        await expect(
            userService("Toru", "test@example.com", "")
        ).rejects.toThrow("passwordがない");
    });
});