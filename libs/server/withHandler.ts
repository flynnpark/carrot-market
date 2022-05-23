import { NextApiRequest, NextApiResponse } from 'next';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ResponseType {
  success: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: RequestMethod;
  handler: (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) => Promise<void | NextApiResponse> | void | NextApiResponse;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ success: false });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error });
    }
  };
}
