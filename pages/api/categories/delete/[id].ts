import { corsMiddleware } from '@/middlewares/cors.middleware';
import withTokenMiddleware from '@/middlewares/token.middleware';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = corsMiddleware(Cors({ methods: ['DELETE'] }));

const prisma = new PrismaClient();

export default withTokenMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);

    if (req.method !== 'DELETE') {
      return res.status(405).json({ message: 'Método não permitido' });
    }

    const { id } = req.query;

    const userFound = await prisma.user.findFirst({
      where: { id: req.userId },
    });

    if (!userFound) {
      return res.status(404).json({ message: 'Você não tem permissão.' });
    }

    if (!userFound.isAdmin) {
      return res.status(400).json({ message: 'Você não tem permissão.' });
    }

    await prisma.category.delete({
      where: { id: id?.toString() },
    });

    return res.status(200).json({ message: 'Categoria deletada com sucesso!' });
  }
);
