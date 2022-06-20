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
  if (req.method === 'GET') {
    const {
      query: { id },
    } = req;
    const stream = await client.stream.findUnique({
      where: {
        id: parseInt(id.toString(), 10),
      },
    });
    res.json({
      success: true,
      stream,
    });
  }
}

export default withApiSession(withHandler({ methods: ['GET'], handler }));
