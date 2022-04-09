import argon2 from "argon2";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";
import { createHexArray } from "../../../utils/createhexarray";
import { apiHandler } from "../api-handler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: 405, message: "Invalid request!!" });
  }

  if (!req.body.hasOwnProperty("productKey")) {
    return res.status(400).json({ message: "Product key is required" });
  }

  const hash = await argon2.hash(req.body.productKey + process.env.SECRET_KEY);

  const hashArray = createHexArray(hash);

  const hardwareToken = await prisma.hardwareToken.create({
    data: {
      hash,
      productKey: req.body.productKey,
    },
  });

  return res.status(201).json({
    message: "Hardware Token Created Successfully",
    hardwareToken,
    hashArray,
  });
}

export default apiHandler(handler);
