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

  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: 'Anonymous',
      ...payload,
    },
    update: {},
  });

  console.log(user);

  res.status(200).end();
}

export default withHandler('POST', handler);
