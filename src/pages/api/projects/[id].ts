import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectId = parseInt(req.query.id as string);

  if (req.method === "PUT") {
    const { name } = JSON.parse(req.body);

    const result = await prisma.projects.update({
      where: { id: projectId },
      data: { name },
    });

    res.json(result);
  }

  if (req.method === "DELETE") {
    const result = await prisma.projects.delete({
      where: { id: projectId },
    });

    res.json(result);
  }
}
