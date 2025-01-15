import { NextApiRequest, NextApiResponse } from "next";
import { AccessToken, RoomServiceClient } from "livekit-server-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { roomId, username, topic } = req.body;

  // Validate request parameters
  if (!roomId) {
    return res.status(400).json({ error: 'Missing "roomId" in request body' });
  }
  if (!username) {
    return res.status(400).json({ error: 'Missing "username" in request body' });
  }

  // Validate environment variables
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    console.error("Server misconfigured:", { apiKey, apiSecret, wsUrl });
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const livekitHost = wsUrl.replace("wss://", "https://");
  const roomServiceClient = new RoomServiceClient(
    livekitHost,
    apiKey,
    apiSecret
  );

  try {
    const rooms = await roomServiceClient.listRooms();
    const room = rooms.find((room) => room.name === roomId);
    
    if (room) {
      const participants = await roomServiceClient.listParticipants(roomId);

      if (participants.some((participant) => participant.name === username)) {
        console.log("Username already exists in the room", username);
        return res
          .status(409)
          .json({ error: "Username already exists in the room" });
      }
    } else {
      console.log("Room does not exist, creating it", roomId, topic);
      await roomServiceClient.createRoom({
        name: roomId,
        metadata: JSON.stringify(topic),  // Stringify the topic object
      });
    }
  } catch (error) {
    console.error("Error checking room participants:", error);
    return res.status(500).json({ error: "Failed to verify username availability" });
  }

  try {
    const accessToken = new AccessToken(apiKey, apiSecret, {
      identity: username,
      name: username,
    });

    accessToken.addGrant({
      room: roomId,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
    });

    return res.status(200).json({ token: await accessToken.toJwt() });
  } catch (error) {
    console.error("Error generating token:", error);
    return res.status(500).json({ error: `Failed to generate token ${error}` });
  }
}
