import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { errorHandler } from "./error-handler";
import { JwtMiddleware } from "./middlewares/jwt-middleware";

export function apiHandler(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await JwtMiddleware(req, res);
      await handler(req, res);
    } catch (err) {
      errorHandler(err, res);
    }
  };
}
