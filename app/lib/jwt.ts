import jwt from "jsonwebtoken";



// Secret keys for signing tokens (you can use different keys)
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "";

if (!accessTokenSecret) {
  throw new Error("ACCESS_TOKEN_SECRET is not set in environment variables.");
}


/**
 * Generate a JWT token
 */
export function generateAccessToken(payload: object): string {
  return jwt.sign(payload, accessTokenSecret, {expiresIn: "15m"} );
}

export function generateRefreshToken(payload: object): string {
  return jwt.sign(payload, refreshTokenSecret, { expiresIn: "1d" });
}

/**
 * Verify a JWT token
 */
export function verifyToken(token: string) {
  return jwt.verify(token, accessTokenSecret);
}
