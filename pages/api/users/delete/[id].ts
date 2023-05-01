import { corsMiddleware } from '@/middlewares/cors.middleware';
import withTokenMiddleware from '@/middlewares/token.middleware';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const cors = corsMiddleware(Cors({ methods: ['DELETE'] }));

const prisma = new PrismaClient();

export default withTokenMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);

    if (req.method !== 'DELETE') {
      return res.status(405).json({ message: 'Método não permitido' });
    }

    const { id } = req.query;

    const userToken = await prisma.user.findFirst({
      where: { id: req.userId },
    });

    if (userToken?.id !== id && !userToken?.isAdmin) {
      return res.status(400).json({ message: 'Você não tem permissão.' });
    }

    const userFound = await prisma.user.findFirst({
      where: { id: id?.toString() },
    });

    if (!userFound) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const email = userFound.email;

    await prisma.user.delete({ where: { id: id?.toString() } });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTPHOST,
      port: Number(process.env.SMTPPORT),
      auth: {
        user: process.env.SMTPUSER,
        pass: process.env.SMTPPASSWORD,
      },
    });

    transporter
      .sendMail({
        from: process.env.SMTPUSER,
        to: email,
        replyTo: email,
        subject: 'Cadastro deletado!',
        html: `<p>Seu cadastro foi deletado com sucesso. Vamos sentir sua falta.</p>`,
      })
      .then((res) => res)
      .catch((error) => console.error(error));

    return res.status(200).json({ message: 'Cadastro deletado com sucesso!' });
  }
);
