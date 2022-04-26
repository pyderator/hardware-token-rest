import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma";
import { apiHandler } from "../api-handler";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getUnassignedUsers();
    default:
      return res
        .status(405)
        .json({ message: `Requested method ${req.method} is not allowed` });
  }

  async function getUnassignedUsers() {
    const users = await prisma.user.findMany({
      where: {
        hardwareToken: {
          is: null,
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    res.status(200).json({ message: "Users found", users });
  }
};

export default apiHandler(handler);
