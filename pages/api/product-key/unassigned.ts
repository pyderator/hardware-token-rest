import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getUnassignedProductKeys();
    default:
      return res
        .status(405)
        .json({ message: `Requested method ${req.method} is not allowed` });
  }

  async function getUnassignedProductKeys() {
    const productKeys = await prisma.hardwareToken.findMany({
      where: {
        user: {
          is: null,
        },
      },
      select: {
        id: true,
        productKey: true,
      },
    });

    res.status(200).json({ message: "Product keys found", productKeys });
  }
};

export default handler;
