import type { NextApiRequest, NextApiResponse } from "next";
import { polar } from "../../../lib/polar";
import {
  setSessionCookie,
  createSession,
  type PortalSession,
} from "../../../lib/portal";

interface ValidateResponse {
  success: boolean;
  error?: string;
  session?: PortalSession;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValidateResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { key } = req.body;
  if (!key || typeof key !== "string") {
    return res.status(400).json({ success: false, error: "License key required" });
  }

  try {
    const result = await polar.customerPortal.licenseKeys.validate({
      key: key.trim(),
      organizationId: process.env.POLAR_ORGANIZATION_ID!,
    });

    if (result.status !== "granted") {
      return res.status(401).json({
        success: false,
        error: `License ${result.status}`,
      });
    }

    const session = createSession(result.customerId!, result.displayKey!);
    setSessionCookie(res, session);

    return res.status(200).json({ success: true, session });
  } catch (err) {
    console.error("License validation error:", err);
    return res.status(401).json({ success: false, error: "Invalid license key" });
  }
}
