import type { NextApiRequest, NextApiResponse } from "next";
import { polar } from "../../../lib/polar";
import { setSessionCookie, createSession } from "../../../lib/portal";

interface SessionLoginResponse {
  success: boolean;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SessionLoginResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { token } = req.body;
  if (!token || typeof token !== "string") {
    return res.status(400).json({ success: false, error: "Session token required" });
  }

  try {
    const licenses = await polar.customerPortal.licenseKeys.list(
      { customerSession: token },
      {}
    );

    const firstLicense = licenses.result.items[0];
    if (!firstLicense) {
      return res.status(404).json({ success: false, error: "No license found" });
    }

    const session = createSession(
      firstLicense.customerId,
      firstLicense.displayKey
    );
    setSessionCookie(res, session);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Session login error:", err);
    return res.status(401).json({ success: false, error: "Failed to fetch license" });
  }
}
