import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import client from 'libs/server/client';
import { withApiSession } from 'libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;
  if (req.method === 'POST') {
    const {
      body: { name, description, price },
    } = req;
    const stream = await client.stream.create({
      data: {
        name,
        description,
        price: parseInt(price, 10),
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      success: true,
      stream,
    });
  } else if (req.method === 'GET') {
    const streams = await client.stream.findMany();

    res.json({
      success: true,
      streams,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ['POST', 'GET'], handler })
);
