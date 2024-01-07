import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { Name, Thread, Pinned, Moderation, Server } = req.body;

      const existingChannel = await prisma.channel.findFirst({
        where: {
          Name,
          Thread: Thread || "",
          Pinned: Pinned || "",
          Moderation: Moderation || false,
          Server,
        },
      });

      const selectServer = await prisma.server.findFirst({
        where: {
          Id: Server,
        },
      });

      if (existingChannel) {
        return res.status(400).json({ error: 'Channel already exists' });
      }

      const channel = await prisma.channel.create({
        data: {
          Name,
          Thread: Thread || "",
          Pinned: Pinned || "",
          Moderation: Moderation || false,
          Server: { connect: { Id: "42974891634440039765" } },
        },
      });

      res.status(201).json(channel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
