import { NextApiRequest, NextApiResponse } from 'next';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default function withHandler(
  method: RequestMethod,
  handlerFn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await handlerFn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error });
    }
  };
}
