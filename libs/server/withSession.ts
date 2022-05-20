import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiHandler } from 'next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOption = {
  cookieName: 'carrotsession',
  password: process.env.COOKIE_PASSWORD!,
};

export function withApiSession(fn: NextApiHandler) {
  return withIronSessionApiRoute(fn, cookieOption);
}
