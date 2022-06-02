import withHandler, { ResponseType } from 'libs/server/withHandler';
import { withApiSession } from 'libs/server/withSession';
import { NextApiRequest, NextApiResponse } from 'next';
import client from 'libs/server/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<void> {
  const { id } = req.query;
  const alreadyExists = await client.favorite.findFirst({
    where: {
      productId: parseInt(id.toString(), 10),
      userId: req.session?.user?.id,
    },
  });

  if (alreadyExists) {
    await client.favorite.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.favorite.create({
      data: {
        user: {
          connect: {
            id: req.session?.user?.id,
          },
        },
        product: {
          connect: {
            id: parseInt(id.toString(), 10),
          },
        },
      },
    });
  }

  res.json({ success: true });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
