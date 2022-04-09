import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { totp } from "speakeasy";
import { prisma } from "../../../prisma";
import { apiHandler } from "../api-handler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return login();
    default:
      res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function login() {
    const { email, password, code } = req.body;

    if (!(code && password && email)) {
      return res.status(400).json({ message: "Invalid Payload" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        hardwareToken: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with email ${email} not found` });
    }

    if (!user.hardwareToken) {
      return res.status(403).json({ message: "User not activated" });
    }

    if (!(await argon2.verify(user.password, password))) {
      return res
        .status(401)
        .json({ message: 'Email and password doesn"t match' });
    }

    // Check TOTP Code
    if (
      !totp.verify({
        secret: user.hardwareToken?.hash!,
        algorithm: "sha1",
        token: code,
      })
    ) {
      return res.status(401).json({ message: "TOTP Code Invalid" });
    }

    const token = await jwt.sign({ sub: user.id }, process.env.SECRET_KEY!, {
      expiresIn: "7d",
    });

    if (!token) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    return res.status(200).json({
      id: user.id,
      token,
      message: "User authenticated successfully!",
    });
  }
}

export default apiHandler(handler);
