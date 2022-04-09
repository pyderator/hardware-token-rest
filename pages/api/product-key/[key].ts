import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";
import { createHexArray } from "../../../utils/createhexarray";
import { apiHandler } from "../api-handler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "GET") {
    const { key } = req.query;
    if (!key) return res.status(405).json({ message: "Invalid request!" });

    const hardwareToken = await prisma.hardwareToken.findUnique({
      where: {
        productKey: key as string,
      },
    });

    if (!hardwareToken) {
      return res.status(404).json({ message: "Product key not registered" });
    }

    return res.status(200).json({
      ...hardwareToken,
      hashArray: createHexArray(hardwareToken?.hash),
    });
  }

  return res.status(405).json({ message: "Method not supported" });
}

export default apiHandler(handler);
