import client from 'libs/server/client';
import withHandler from 'libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

interface EnterRequest extends NextApiRequest {
  body: {
    phone: string;
    email: string;
  };
}

async function handler(req: EnterRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone } : { email };

  const token = await client.token.create({
    data: {
      payload: '1234',
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: 'Anonymous',
            ...payload,
          },
        },
      },
    },
  });

  res.status(200).end();
}

export default withHandler('POST', handler);
