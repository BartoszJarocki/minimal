import { serialize, parse } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export interface PortalSession {
  customerId: string;
  licenseKey: string;
  validatedAt: number;
  expiresAt: number;
}

const COOKIE_NAME = "minimal_portal_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export const DOWNLOAD_FILES: Record<number, string> = {
  2026: "calendars-2026.zip",
  2027: "calendars-2027.zip",
  2028: "calendars-2028.zip",
};

export function encodeSession(session: PortalSession): string {
  return Buffer.from(JSON.stringify(session)).toString("base64");
}

export function decodeSession(token: string): PortalSession | null {
  try {
    const payload = Buffer.from(token, "base64").toString("utf8");
    const session = JSON.parse(payload) as PortalSession;
    if (session.expiresAt < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export function setSessionCookie(res: NextApiResponse, session: PortalSession) {
  const cookie = serialize(COOKIE_NAME, encodeSession(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION / 1000,
  });
  res.setHeader("Set-Cookie", cookie);
}

export function clearSessionCookie(res: NextApiResponse) {
  const cookie = serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.setHeader("Set-Cookie", cookie);
}

export function getSessionFromRequest(req: NextApiRequest): PortalSession | null {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies[COOKIE_NAME];
  if (!token) return null;
  return decodeSession(token);
}

export function getSessionFromCookieHeader(cookieHeader: string): PortalSession | null {
  const cookies = parse(cookieHeader || "");
  const token = cookies[COOKIE_NAME];
  if (!token) return null;
  return decodeSession(token);
}

export function createSession(customerId: string, licenseKey: string): PortalSession {
  return {
    customerId,
    licenseKey,
    validatedAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION,
  };
}
