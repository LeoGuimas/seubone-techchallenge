import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const recorte = await prisma.recorte.findUnique({
          where: { id: Number(id) },
        });
        if (recorte) {
          res.status(200).json(recorte);
        } else {
          res.status(404).json({ error: 'Recorte not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recorte' });
      }
      break;
    case 'PUT':
      try {
        const { nomeModelo, ordemExibicao, sku, tipoRecorte, posicaoRecorte, tipoProduto, materialRecorte, corMaterial, linkImagem } = req.body;
        const updatedRecorte = await prisma.recorte.update({
          where: { id: Number(id) },
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
        res.status(200).json(updatedRecorte);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update recorte' });
      }
      break;
    case 'DELETE':
      try {
        await prisma.recorte.delete({
          where: { id: Number(id) },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete recorte' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}