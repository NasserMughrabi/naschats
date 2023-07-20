import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.cookies["uid"]) {
    return res.status(200).json({ uid: req.cookies["uid"] });
  }

  return res.status(200).json({ uid: null });
}
