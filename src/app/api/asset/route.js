// /api/portfolio.ts
import { connectMongoDB } from '@/lib/mongodb';
import Asset from '@/models/asset';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { method } = req;

  if (method === 'GET') {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: 'Missing userId' });

    const portfolio = await Portfolio.find({ userId });

    return res.status(200).json(portfolio);
  }
}
