import { corsMiddleware } from '@/middlewares/cors.middleware';
import withTokenMiddleware from '@/middlewares/token.middleware';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

const cors = corsMiddleware(Cors({ methods: ['PATCH'] }));

const prisma = new PrismaClient();

export default withTokenMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);

    if (req.method !== 'PATCH') {
      return res.status(405).json({ message: 'Método não permitido' });
    }

    try {
      const validatedBody = await yup
        .object()
        .shape({
          name: yup.string().optional(),
          price: yup.number().optional(),
          description: yup.string().optional(),
          stock: yup.number().optional(),
          image: yup.string().optional(),
        })
        .validate(req.body, {
          stripUnknown: true,
          abortEarly: false,
        });

      req.body = validatedBody;
    } catch ({ message }: any) {
      return res.status(400).json({ message });
    }

    const { id } = req.query;

    const userFound = await prisma.user.findFirst({
      where: { id: req.userId },
    });

    if (!userFound) {
      return res.status(404).json({ message: 'Você não tem permissão.' });
    }

    if (userFound?.id !== id && !userFound?.isAdmin) {
      return res.status(400).json({ message: 'Você não tem permissão.' });
    }

    const productEdit = await prisma.product.update({
      where: { id: id?.toString() },
      data: req.body,
    });

    return res.status(200).json(productEdit);
  }
);
