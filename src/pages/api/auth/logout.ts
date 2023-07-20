import { NextApiRequest, NextApiResponse } from "next";
import { AuthService } from "../../../lib/firebase/AuthService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { logout } = AuthService;

  // 1. logout user with email and password
  try {
    await logout();
  } catch (e) {
    // console.log("user logout failed");
    return res.status(500).json({ error: e });
  }

  // 2. delete all cookies
  res.setHeader(
    "set-cookie",
    "uid=; expires=Thu, 01 Jan 1970 00:00:00 GMT;Path=/; HttpOnly; SameSite=Strict; Secure"
  );

  // 3. Send no-cache header to prevent 304
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  return res.status(200).json({ message: "Logout success" });
}
