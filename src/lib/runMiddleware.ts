import { NextApiRequest, NextApiResponse } from "next";

// This is a helper function that lets us run a middleware on a request and response to handle CORS
// https://github.com/vercel/next.js/tree/canary/examples/api-routes-cors
export default function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
