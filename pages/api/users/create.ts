import { UserRes } from '@/mappers/users';
import { corsMiddleware } from '@/middlewares/cors.middleware';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import Cors from 'cors';
import { randomUUID } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import * as yup from 'yup';

const cors = corsMiddleware(Cors({ methods: ['POST'] }));

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedBody = await yup
      .object()
      .shape({
        name: yup.string().min(3).max(25).required(),
        email: yup.string().email().required(),
      })
      .validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

    req.body = validatedBody;
  } catch ({ message }: any) {
    return res.status(400).json({ message });
  }

  const { name, email } = req.body;

  const emailFound = await prisma.user.findFirst({
    where: { email },
  });

  if (emailFound) {
    return res.status(400).json({ message: 'Email já cadastrado.' });
  }

  let isAdmin = false;

  const password = Math.random().toString(36).slice(-10);

  const usersCount = await prisma.user.count();

  if (usersCount === 0) isAdmin = true;

  const newUser = await prisma.user.create({
    data: {
      id: randomUUID(),
      email,
      name,
      password: hashSync(password, 10),
      isAdmin,
    },
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
      to: newUser.email,
      replyTo: newUser.email,
      subject: 'Sua senha chegou!',
      html: `<p><strong>Senha: </strong>${password}</p>`,
    })
    .then((res) => res)
    .catch((error) => console.error(error));

  const user = UserRes.handle(newUser);

  return res.status(201).json(user);
}
