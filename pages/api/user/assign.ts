import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";
import { apiHandler } from "../api-handler";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      return assign();
    default:
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }

  async function assign() {
    const { userId, tokenId } = req.body;

    if (!(userId && tokenId)) {
      return res.status(400).json({ message: "Invalid Payload" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = await prisma.hardwareToken.findUnique({
      where: {
        id: tokenId,
      },
    });

    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hardwareTokenId: token.id,
      },
    });

    if (!updateUser) {
      return res
        .status(500)
        .json({ message: "Error while linking user to token" });
    }

    return res.status(201).json({ message: "User updated successfully" });
  }
};

export default apiHandler(handler);
