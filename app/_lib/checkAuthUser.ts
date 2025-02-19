// import { verifyToken } from "@/app/lib/jwt";
// import { NextRequest } from "next/server";

// export async function getAuthUser(request: NextRequest) {
//   const tokenCookie = request.cookies.get("auth_token");
//   if (!tokenCookie) return null;

//   const token = tokenCookie?.value;
//   console.log("Extracted Token:", token);
//   if (!token) return null;

//   try {
//     return verifyToken(token); // Decode and return user info
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return null;
//   }
// }

import { verifyToken } from "@/app/_lib/jwt";
import { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";

interface AuthUser extends JwtPayload {
  id: string;
}

export async function checkAuthUser(request: NextRequest): Promise<AuthUser | null> {
  const authHeader = request.headers.get("Authorization"); // Extract from request headers
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer "
  console.log("Extracted Token:", token);
  if (!token) {
    console.error("No token provided");
    return null; // Ensure function exits
  }

  try {
    return verifyToken(token); // Decode and return user info
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
