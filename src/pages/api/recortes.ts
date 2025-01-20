import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.id) {
        const recorte = await prisma.recorte.findUnique({
          where: { id: Number(req.query.id) },
        });
        if (recorte) {
          res.status(200).json(recorte);
        } else {
          res.status(404).json({ error: 'Recorte not found' });
        }
      } else {
        const recortes = await prisma.recorte.findMany();
        res.status(200).json(recortes);
      }
      break;
    case 'POST':
      try {
        console.log('Request body:', req.body);
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
        console.error('Error creating recorte:', error);
        res.status(500).json({ error: 'Failed to create recorte' });
      }
      break;
    case 'PUT':
      try {
        const { id: updateId, ...data } = req.body;
        const updatedRecorte = await prisma.recorte.update({
          where: { id: Number(updateId) },
          data,
        });
        res.status(200).json(updatedRecorte);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update recorte' });
      }
      break;
    case 'DELETE':
      try {
        const { id: deleteId } = req.body;
        await prisma.recorte.delete({
          where: { id: Number(deleteId) },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete recorte' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}