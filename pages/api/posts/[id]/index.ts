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

  const post = await client.post.findUnique({
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
      answers: {
        select: {
          id: true,
          content: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          agrees: true,
        },
      },
    },
  });

  const isAgree = Boolean(
    await client.agree.findFirst({
      where: {
        postId: parseInt(id.toString(), 10),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({
    success: true,
    post,
    isAgree,
  });
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
