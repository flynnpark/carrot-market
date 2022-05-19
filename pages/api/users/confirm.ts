import withHandler, { ResponseType } from 'libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

interface EnterRequest extends NextApiRequest {
  body: {
    token: string;
  };
}

async function handler(req: EnterRequest, res: NextApiResponse<ResponseType>) {
  const { token } = req.body;
  console.log(token);
  res.status(200).end();
}

export default withHandler('POST', handler);
