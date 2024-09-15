import Pusher from 'pusher';

const pusher = new Pusher({
  appId: 'YOUR_PUSHER_APP_ID',
  key: 'YOUR_PUSHER_KEY',
  secret: 'YOUR_PUSHER_SECRET',
  cluster: 'YOUR_PUSHER_CLUSTER',
  useTLS: true,
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { text, receiverId } = body;

  // Save the message to the database (chat_messages table)
  await client.from('chatMessages').insert([
    { chat_room_id: body.chat_room_id, sender_id: body.sender_id, message: text }
  ]);

  // Send the message using Pusher to the other user
  await pusher.trigger(`chat-${receiverId}`, 'message', {
    text,
    sender_id: body.sender_id,
  });

  return { success: true };
});
