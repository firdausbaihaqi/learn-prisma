import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.body;

  const result = await prisma.projects.create({
    data: {
      name,
    },
  });

  res.json(result);
}
