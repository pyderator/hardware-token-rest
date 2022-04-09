import expressJwt from "express-jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { promisify } from "util";

export function JwtMiddleware(req: NextApiRequest, res: NextApiResponse) {
  const middleware = expressJwt({
    secret: process.env.SECRET_KEY!,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/user/login",
      "/api/user/add",
      "/api/product-key/add",
      "/api/user/assign",
      "/api/user/unassigned",
      "/api/product-key/unassigned",
    ],
  });

  return promisify(middleware)(req as any, res as any);
}
