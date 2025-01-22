import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    // Substitua pelo critério correto de busca do usuário
    const user = await prisma.user.findUnique({
      where: { email: 'user@example.com' }, // Ajuste o e-mail conforme necessário
    });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Comparação simples sem hash
    if (user.password !== password) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Criação do token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'default_secret', {
      expiresIn: '15m',
    });

    // Definição do cookie com o token JWT
    res.setHeader(
      'Set-Cookie',
      `next-auth.session-token=${token}; HttpOnly; Path=/; Max-Age=900`
    );

    console.log('Login bem-sucedido');
    return res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
