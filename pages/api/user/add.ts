import argon2 from "argon2";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";
import { apiHandler } from "../api-handler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: 405, message: "Invalid request!!" });
  }

  if (
    !(req.body.hasOwnProperty("email") || req.body.hasOwnProperty("password"))
  ) {
    return res.status(400).json({ message: "email and password is required" });
  }
  const doesUserExists = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (doesUserExists) {
    return res
      .status(400)
      .json({ message: `User with email ${req.body.email} already exists` });
  }
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: await argon2.hash(req.body.password),
      hardwareTokenId: null,
    },
  });
  if (!user)
    return res
      .status(500)
      .json({ message: "Something went wrong while creating user" });

  const { password, ...userInfo } = user;
  return res
    .status(201)
    .json({ message: "User created successfully", ...userInfo });
}

export default apiHandler(handler);
