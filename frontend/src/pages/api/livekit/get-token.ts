import { NextApiRequest, NextApiResponse } from "next";
import { AccessToken, RoomServiceClient } from "livekit-server-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { room: roomId, username } = req.query;

  // Validate request parameters
  if (!roomId) {
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
    console.error("Server misconfigured:", { apiKey, apiSecret, wsUrl });
    return res.status(500).json({ error: "Server misconfigured" });
  }

  try {
    const livekitHost = wsUrl.replace("wss://", "https://");
    const roomServiceClient = new RoomServiceClient(
      livekitHost,
      apiKey,
      apiSecret
    );
    const rooms = await roomServiceClient.listRooms();
    const room = rooms.find((room) => room.name === roomId);
    if (room) {
      const participants = await roomServiceClient.listParticipants(
        roomId as string
      );

      // Check if username already exists in the room
      // if (participants.some((participant) => participant.name === username)) {
      //   return res
      //     .status(500)
      //     .json({ error: "Username already exists in the room" });
      // }
      // console.log("Current participants in room:", participants);
    }
  } catch (error) {
    console.error("Error listing participants:", error);
  }

  try {
    const accessToken = new AccessToken(apiKey, apiSecret, {
      identity: username as string,
      name: username as string,
    });

    accessToken.addGrant({
      room: roomId as string,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });
    console.log("Token generated successfully");
    return res.status(200).json({ token: await accessToken.toJwt() });
  } catch (error) {
    console.error("Error generating token:", error);
    return res.status(500).json({ error: `Failed to generate token ${error}` });
  }
}
