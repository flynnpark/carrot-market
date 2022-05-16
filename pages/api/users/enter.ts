import client from 'libs/server/client';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

interface EnterRequest extends NextApiRequest {
  body: {
    phone: string;
    email: string;
  };
}

async function handler(req: EnterRequest, res: NextApiResponse<ResponseType>) {
  const { phone, email } = req.body;
  const enterPayload = phone ? { phone } : email ? { email } : null;
  if (!enterPayload) {
    return res.status(400).json({ success: false });
  }

  const tokenPayload = String(Math.floor(100000 + Math.random() * 900000));
  const token = await client.token.create({
    data: {
      payload: tokenPayload,
      user: {
        connectOrCreate: {
          where: {
            ...enterPayload,
          },
          create: {
            name: 'Anonymous',
            ...enterPayload,
          },
        },
      },
    },
  });

  return res.status(200).json({
    success: true,
  });
}

export default withHandler('POST', handler);
