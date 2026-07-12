import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";

export type UserRole = "student" | "teacher" | "parent" | "admin";

export type AuthClaims = {
  sub: number;
  role: UserRole;
  email: string;
  displayName: string;
};

export function signToken(claims: AuthClaims): string {
  return jwt.sign(claims, JWT_SECRET, { expiresIn: "14d" });
}

export function parseBearerToken(headerValue: string | undefined): string | null {
  if (!headerValue) {
    return null;
  }
  const [scheme, token] = headerValue.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }
  return token;
}

export type AuthenticatedRequest = Request & {
  user?: AuthClaims;
};

const claimsSchema = z.object({
  sub: z.number(),
  role: z.enum(["student", "teacher", "parent", "admin"]),
  email: z.string(),
  displayName: z.string(),
});

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const token = parseBearerToken(req.header("Authorization"));
  if (!token) {
    res.status(401).json({ error: "Missing or invalid Authorization header" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const parsed = claimsSchema.safeParse(decoded);
    if (!parsed.success) {
      res.status(401).json({ error: "Invalid token claims" });
      return;
    }
    req.user = parsed.data;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function requireRole(roles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: "Insufficient role" });
      return;
    }
    next();
  };
}
