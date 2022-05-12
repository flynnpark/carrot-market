import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../libs/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.user.create({
    data: {
      email: 'john@gmail.com',
      name: 'John Doe',
    },
  });

  res.json({
    ok: true,
  });
}
