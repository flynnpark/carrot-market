import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import client from 'libs/server/client';
import { withApiSession } from 'libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const {
      query: { lat, lon },
    } = req;

    const latNumber = Number(lat);
    const lonNumber = Number(lon);

    const posts = await client.post.findMany({
      where:
        latNumber && lonNumber
          ? {
              lat: {
                gte: latNumber - 0.01,
                lte: latNumber + 0.01,
              },
              lon: {
                gte: lonNumber - 0.01,
                lte: lonNumber + 0.01,
              },
            }
          : {},
      include: {
        user: {
          select: {
            name: true,
            id: true,
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
      body: { content, lat, lon },
      session: { user },
    } = req;

    const post = await client.post.create({
      data: {
        content,
        lat,
        lon,
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
