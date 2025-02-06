import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";
import { generateAccessToken, generateRefreshToken } from "@/app/lib/jwt";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { userName, password } = await request.json();

    if (!userName || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
    }

    // Find user in the database
    const user = await prisma.users.findUnique({
      where: { userName },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }


    // Generate JWT token
    // const token = jwt.sign(
    //   // { id: user.id, userName: user.userName, type: user.type },
    //   user,
    //   SECRET_KEY,
    //   { expiresIn: "1h" }
    // );

    const accessToken = generateAccessToken({ id: user.id, userName: user.userName, type: user.type });
    const refreshToken = generateRefreshToken({ id: user.id, userName: user.userName, type: user.type });

    // Create a response object
    const response = NextResponse.json({ message: "Login successful",  status: 200, accessToken });

    
    // Set refresh token as httpOnly cookie
    response.cookies.set("refreshJwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Send cookie over HTTPS in production
      sameSite: "strict", // Restrict cookie sharing across sites
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/", // Cookie available across the entire app
    });

    return response;
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
