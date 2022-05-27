import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import client from 'libs/server/client';
import { withApiSession } from 'libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;

  const product = await client.product.findUnique({
    where: {
      id: parseInt(id.toString(), 10),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  res.json({
    success: true,
    product,
  });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
