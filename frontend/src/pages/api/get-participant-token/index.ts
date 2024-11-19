import { NextApiRequest, NextApiResponse } from "next";
import { AccessToken } from "livekit-server-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { room, username } = req.query;

  // Validate request parameters
  if (!room) {
    return res.status(400).json({ error: 'Missing "room" query parameter' });
  }
  if (!username) {
    return res
      .status(400)
      .json({ error: 'Missing "username" query parameter' });
  }

  // Validate environment variables
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return res.status(500).json({ error: "Server misconfigured" });
  }

  try {
    const accessToken = new AccessToken(apiKey, apiSecret, {
      identity: Array.isArray(username) ? username[0] : username,
    });

    accessToken.addGrant({
      room: Array.isArray(room) ? room[0] : room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });
    return res.status(200).json({ token: await accessToken.toJwt() });
  } catch (error) {
    return res.status(500).json({ error: `Failed to generate token ${error}` });
  }
}
