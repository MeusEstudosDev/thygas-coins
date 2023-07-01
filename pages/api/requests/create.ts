import { corsMiddleware } from '@/middlewares/cors.middleware';
import withTokenMiddleware from '@/middlewares/token.middleware';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';
import { randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import * as yup from 'yup';

const cors = corsMiddleware(Cors({ methods: ['POST'] }));

const prisma = new PrismaClient();

export default withTokenMiddleware(
  async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método não permitido' });
    }

    console.log(req.body);

    try {
      const validatedBody = await yup
        .object()
        .shape({
          total: yup.number().required(),
          status: yup.string().required(),
          itens: yup.array(
            yup.object().shape({
              name: yup.string().required(),
              count: yup.number().required(),
              price: yup.number().required(),
              character: yup.string().optional(),
              image: yup.string().required(),
            })
          ),
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
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const newRequest = await prisma.request.create({
      data: {
        id: randomUUID(),
        number: Math.random().toString(36).slice(-10),
        total: req.body.total,
        status: req.body.status,
        clientId: userFound.id,
      },
    });

    await req.body.itens.map(async (el: any) => {
      return await prisma.requestItens.create({
        data: {
          id: randomUUID(),
          name: el.name,
          count: el.count,
          price: el.price,
          character: el.character || null,
          image: el.image,
          requestId: newRequest.id,
        },
      });
    }); 

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
        to: process.env.SMTPUSER,
        replyTo: process.env.SMTPUSER,
        subject: `Novo pedido na Thygas-Coins.`,
        html: `
        <p><strong>ID Pedido: </strong> ${newRequest.id}</p>
        <p><strong>ID Cliente: </strong> ${newRequest.clientId}</p>
        <p><strong>Nº Pedido: </strong> ${newRequest.number}</p>
        <p><strong>Data: </strong> ${newRequest.createdAt}</p>
        <p><strong>Status: </strong> ${newRequest.status}</p>
        <p><strong>Total: </strong> ${Number(newRequest.total).toLocaleString(
          'pt-BR',
          {
            style: 'currency',
            currency: 'BRL',
          }
        )}</p>
        `,
      })
      .then((res) => res)
      .catch((error) => console.error(error));

    return res.status(201).json(newRequest);
  }
);
