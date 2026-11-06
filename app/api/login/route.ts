//もらった情報を使ってログインするAPI
import { NextResponse } from "next/server";
import { loginService } from "@/lib/services/loginService";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        await loginService(body.mail, body.password);

        return NextResponse.json(
            { message: "ログイン成功" },
            { status: 200 }
        );
    } catch (error) {
        if (
            error instanceof Error &&
            ["mailがない", "passwordがない",
             "アカウントが見つからない", "パスワードが違う"
            ].includes(error.message)
        ) {
            return NextResponse.json(
                { message: "ログイン失敗" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: "サーバーエラー" },
            { status: 500 }
        );
    }
}