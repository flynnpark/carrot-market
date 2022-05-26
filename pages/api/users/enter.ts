import client from 'libs/server/client';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';
import mail from '@sendgrid/mail';

// const twilioClient = twilio(
//   process.env.TWILIO_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// mail.setApiKey(process.env.SENDGRID_API_KEY!);

interface EnterRequest extends NextApiRequest {
  body: {
    phone: string;
    email: string;
  };
}

async function handler(req: EnterRequest, res: NextApiResponse<ResponseType>) {
  const { phone, email } = req.body;
  const enterPayload = phone ? { phone } : email ? { email } : null;
  if (!enterPayload) {
    return res.status(400).json({ success: false });
  }

  const tokenPayload = String(Math.floor(100000 + Math.random() * 900000));
  const token = await client.token.create({
    data: {
      payload: tokenPayload,
      user: {
        connectOrCreate: {
          where: {
            ...enterPayload,
          },
          create: {
            name: 'Anonymous',
            ...enterPayload,
          },
        },
      },
    },
  });

  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
    //   to: process.env.MY_PHONE!,
    //   body: `Your login token is ${tokenPayload}`,
    // });
  } else if (email) {
    // const email = await mail.send({
    //   from: process.env.EMAIL_SENDER!,
    //   to: process.env.EMAIL_SENDER,
    //   subject: 'Login token',
    //   text: `Your login token is ${tokenPayload}`,
    // });
  }

  return res.status(200).json({
    success: true,
  });
}

export default withHandler({ methods: ['POST'], handler, isPrivate: false });
