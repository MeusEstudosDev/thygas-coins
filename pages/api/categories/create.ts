import { corsMiddleware } from '@/middlewares/cors.middleware';
import withTokenMiddleware from '@/middlewares/token.middleware';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

const cors = corsMiddleware(Cors({ methods: ['POST'] }));

const prisma = new PrismaClient();

export default withTokenMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método não permitido' });
    }

    try {
      const validatedBody = await yup
        .object()
        .shape({
          name: yup.string().required(),
        })
        .validate(req.body, {
          stripUnknown: true,
          abortEarly: false,
        });

      req.body = validatedBody;
    } catch ({ message }: any) {
      return res.status(400).json({ message });
    }

    const userFound = await prisma.user.findFirst({
      where: { id: req.userId },
    });

    if (!userFound) {
      return res.status(400).json({ message: 'Você não tem permissão.' });
    }

    if (!userFound.isAdmin) {
      return res.status(400).json({ message: 'Você não tem permissão.' });
    }

    const categoryFound = await prisma.category.findFirst({
      where: { name: req.body.name },
    });

    if (categoryFound) {
      return res.status(400).json({ message: 'Categoria já cadastrada.' });
    }

    const categoryCreate = await prisma.category.create({
      data: {
        id: randomUUID(),
        ...req.body,
      },
    });

    return res.status(200).json(categoryCreate);
  }
);
