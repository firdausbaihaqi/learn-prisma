import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectId = parseInt(req.query.id as string);

  if (req.method === "PUT") {
  }

  if (req.method === "DELETE") {
    const result = await prisma.projects.delete({
      where: { id: projectId },
    });

    res.json(result);
  }
}
