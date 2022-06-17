import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import client from 'libs/server/client';
import { withApiSession } from 'libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const profile = await client.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });
    res.json({
      success: true,
      profile,
    });
  }
  if (req.method === 'PATCH') {
    const {
      session: { user },
      body: { name, email, phone },
    } = req;

    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    if (name && name !== currentUser?.name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
      res.json({
        success: true,
      });
    } else if (email && email !== currentUser?.email) {
      const alreadyExists = await client.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });
      if (alreadyExists) {
        return res.json({
          success: false,
          message: 'Email already exists',
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
      res.json({
        success: true,
      });
    } else if (phone && phone !== currentUser?.phone) {
      const alreadyExists = await client.user.findUnique({
        where: {
          phone,
        },
        select: {
          id: true,
        },
      });
      if (alreadyExists) {
        return res.json({
          success: false,
          message: 'Phone already exists',
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone,
        },
      });
      res.json({
        success: true,
      });
    }
    res.json({
      success: false,
      message: 'No changes made',
    });
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'PATCH'], handler })
);
