import { NextApiRequest, NextApiResponse } from "next";
import { Timestamp } from "firebase/firestore";
import Cors from "cors";
import runMiddleware from "../../../lib/runMiddleware";

// eslint-disable-next-line new-cap
const cors = Cors({
  methods: ["GET"]
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  try {
    const serverTime = Timestamp.now().toMillis();
    res.status(200).json({ serverTime });
  } catch (error) {
    console.error("Error retrieving server time:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
