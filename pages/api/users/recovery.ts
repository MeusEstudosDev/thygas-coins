import { corsMiddleware } from '@/middlewares/cors.middleware';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import * as yup from 'yup';

const cors = corsMiddleware(Cors({ methods: ['PATCH'] }));

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  if (req.method !== 'PATCH')
    return res.status(405).json({ message: 'Método não permitido' });

  try {
    await yup
      .object()
      .shape({
        email: yup.string().email().required(),
      })
      .validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });
  } catch ({ message }: any) {
    return res.status(400).json({ message });
  }

  const { email } = req.body;

  const emailFound = await prisma.user.findFirst({
    where: { email },
  });

  if (!emailFound)
    return res.status(404).json({ message: 'Email não cadastrado.' });

  const password = Math.random().toString(36).slice(-10);

  const user = await prisma.user.update({
    where: { email },
    data: { password: hashSync(password, 10) },
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
      to: user.email,
      replyTo: user.email,
      subject: 'Sua nova senha chegou!',
      html: `<p><strong>Senha: </strong>${password}</p>`,
    })
    .then((res) => res)
    .catch((error) => console.error(error));

  return res.status(200).json({ message: 'Nova senha enviada por email.' });
}
