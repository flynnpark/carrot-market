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
    query: { id },
    body: { message },
  } = req;

  const newMessage = await client.message.create({
    data: {
      message,
      stream: {
        connect: {
          id: parseInt(id.toString(), 10),
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  res.json({
    success: true,
    message: newMessage,
  });
}

export default withApiSession(
  withHandler({ methods: ['POST', 'GET'], handler })
);
