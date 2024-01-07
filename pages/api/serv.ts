import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

function generateUniqueId() {
  const length = 20;
  let id = '';
  const characters = '0123456789';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { Name, Members, Admins } = req.body;
      const Id = generateUniqueId();

      const server = await prisma.server.create({
        data: {
          Id,
          Name,
          Members,
          Admins,
        }
      });

      res.status(201).json(server);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
