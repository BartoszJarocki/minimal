import type { NextApiRequest, NextApiResponse } from "next";
import { getSessionFromRequest, DOWNLOAD_FILES } from "../../../lib/portal";
import { getDownloadUrl } from "../../../lib/r2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = getSessionFromRequest(req);
  if (!session) {
    return res.redirect(302, "/portal");
  }

  const { file } = req.query;
  if (!file || typeof file !== "string") {
    return res.status(400).json({ error: "File parameter required" });
  }

  const allowedFiles = Object.values(DOWNLOAD_FILES);
  if (!allowedFiles.includes(file)) {
    return res.status(400).json({ error: "Invalid file" });
  }

  try {
    const signedUrl = await getDownloadUrl(file, 3600);
    return res.redirect(302, signedUrl);
  } catch (err) {
    console.error("Download URL generation error:", err);
    return res.status(500).json({ error: "Failed to generate download URL" });
  }
}
