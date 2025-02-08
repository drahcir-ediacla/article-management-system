import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get("Authorization"); // Extract from request headers
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

    const existingAccessToken = authHeader.split(" ")[1]; // Extract token after "Bearer "
    console.log("Existing Access Token:", existingAccessToken);

    const tokenCookie = request.cookies.get("refreshJWT");
    if (!tokenCookie) return null;

    const refreshToken = tokenCookie?.value;
    console.log("Extracted Refresh Token:", refreshToken);
    if (!refreshToken) return null;
}