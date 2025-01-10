import { NextApiRequest, NextApiResponse } from 'next';
import { getMessages, sendMessage } from '@/server/resolver/chat';

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const conversationId = req.query.conversationId as string;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
  // const messages = await getMessages(conversationId, limit);
  const messages = [];
  return res.status(200).json(messages);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.senderId || !req.body.text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const conversationId = req.query.conversationId as string;
  const messageInput = {
    senderId: req.body.senderId,
    text: req.body.text,
    type: req.body.type || 'text'
  };

  console.log("messageInput", messageInput);

  const newMessage = await sendMessage(conversationId, messageInput);
  return res.status(200).json(newMessage);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.conversationId) {
    return res.status(400).json({ error: 'Missing conversationId parameter' });
  }

  try {
    if (req.method === 'GET') {
      return handleGet(req, res);
    }
    if (req.method === 'POST') {
      return handlePost(req, res);
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 