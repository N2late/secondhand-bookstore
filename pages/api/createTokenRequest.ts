import Ably from 'ably/promises';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * It creates a new Ably client, creates a token request, and returns the token request data
 * @param {NextApiRequest} req - NextApiRequest - the request object
 * @param {NextApiResponse} res - NextApiResponse - The response object that you can use to send a
 * response back to the client.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY as any);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: 'ably-nextjs-demo',
  });
  res.status(200).json(tokenRequestData);
}
