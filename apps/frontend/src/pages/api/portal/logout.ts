import type { NextApiRequest, NextApiResponse } from "next";
import { clearSessionCookie } from "../../../lib/portal";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  clearSessionCookie(res);
  res.redirect(302, "/portal");
}
