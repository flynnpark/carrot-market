import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import client from 'libs/server/client';
import { withApiSession } from 'libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            agrees: true,
            answers: true,
          },
        },
      },
    });
    res.json({
      success: true,
      posts,
    });
  } else {
    const {
      body: { content },
      session: { user },
    } = req;

    const post = await client.post.create({
      data: {
        content,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      success: true,
      post,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler })
);
