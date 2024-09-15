export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { userId1, userId2 } = body;
  
    // Check if a chat room exists between these two users
    const { data, error } = await client
      .from('chatRooms')
      .select('*')
      .or(`user_id_1.eq.${userId1},user_id_2.eq.${userId1}`)
      .or(`user_id_1.eq.${userId2},user_id_2.eq.${userId2}`);
  
    if (error || !data) {
      // Create new chat room if none exists
      const { data: newChatRoom, error: createError } = await client
        .from('chat_rooms')
        .insert([{ user_id_1: userId1, user_id_2: userId2 }]);
  
      return { chatRoom: newChatRoom };
    }
  
    return { chatRoom: data[0] };
  });
  