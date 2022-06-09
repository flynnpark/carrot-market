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
    body: { content },
  } = req;

  const post = await client.post.findUnique({
    where: {
      id: parseInt(id.toString(), 10),
    },
  });

  if (!post) {
    res.status(404).json({
      success: false,
      message: 'Post not found',
    });
    return;
  }

  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: post.id,
        },
      },
      content,
    },
  });

  res.json({
    success: true,
    answer: newAnswer,
  });
}

export default withApiSession(withHandler({ methods: ['POST'], handler }));
