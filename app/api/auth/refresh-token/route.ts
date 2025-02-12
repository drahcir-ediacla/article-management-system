import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "@/app/lib/jwt";

export async function GET(request: NextRequest) {
    const tokenCookie = request.cookies.get("refreshJwt");
    
    if (!tokenCookie) {
        return NextResponse.json({ message: "No refresh token provided" }, { status: 401 });
    }

    const refreshToken = tokenCookie?.value;

    try {
        // Check if refresh token exists in DB
        const user = await prisma.refresh_token.findFirst({
            where: { token: refreshToken },
        });

        if (!user) {
            return NextResponse.json({ message: "Refresh token not found" }, { status: 403 });
        }

        console.log("✅ User found:", user.userId);

        // Verify and decode the refresh token
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "") as { userId: string, userName: string, type: string };
            console.log('Decoded ID:', decoded.userId);
        } catch (err) {
            return NextResponse.json({ message: "Invalid refresh token" }, { status: 403 });
        }

        // Ensure the decoded token matches the stored user ID
        if (!user || user.userId !== decoded.userId) {
            return NextResponse.json({ message: "Token mismatch or user not found" }, { status: 403 });
        }

        // Generate a new access token
        const accessToken = generateAccessToken({ userId: decoded.userId, userName: decoded.userName, type: decoded.type });

        return NextResponse.json({ accessToken });
    } catch (error) {
        console.error("Error refreshing token:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
