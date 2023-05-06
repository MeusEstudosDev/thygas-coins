import { corsMiddleware } from '@/middlewares/cors.middleware';
import withTokenMiddleware from '@/middlewares/token.middleware';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = corsMiddleware(Cors({ methods: ['GET'] }));

const prisma = new PrismaClient();

export default withTokenMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);

    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Método não permitido' });
    }

    const userFound = await prisma.user.findFirst({
      where: { id: req.userId },
    });

    if (!userFound) {
      return res.status(400).json({ message: 'Você não tem permissão.' });
    }

    if (!userFound.isAdmin) {
      const requests = await prisma.request.findMany({});
      return res.status(200).json(requests);
    }

    const requests = await prisma.request.findMany({
      where: {
        clientId: req.userId,
      },
      include: {
        itens: true,
      },
    });

    return res.status(200).json(requests);
  }
);
