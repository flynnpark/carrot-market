import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import client from 'libs/server/client';
import { withApiSession } from 'libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadyExists = await client.agree.findFirst({
    where: {
      userId: user?.id,
      postId: parseInt(id.toString(), 10),
    },
    select: {
      id: true,
    },
  });

  if (alreadyExists) {
    await client.agree.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.agree.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: parseInt(id.toString(), 10),
          },
        },
      },
    });
  }

  res.json({
    success: true,
  });
}

export default withApiSession(withHandler({ methods: ['POST'], handler }));
