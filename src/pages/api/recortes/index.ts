import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const recortes = await prisma.recorte.findMany();
        res.status(200).json(recortes);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recortes' });
      }
      break;
    case 'POST':
      try {
        const { nomeModelo, ordemExibicao, sku, tipoRecorte, posicaoRecorte, tipoProduto, materialRecorte, corMaterial, linkImagem } = req.body;
        const recorte = await prisma.recorte.create({
          data: {
            nomeModelo,
            ordemExibicao: Number(ordemExibicao),
            sku,
            tipoRecorte,
            posicaoRecorte,
            tipoProduto,
            materialRecorte,
            corMaterial,
            linkImagem,
          },
        });
        res.status(201).json(recorte);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create recorte' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}