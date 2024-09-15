<template>
    <div>
      <h2>Chat with {{ chatPartner.first_name }} {{ chatPartner.second_name }}</h2>
      <div v-for="msg in messages" :key="msg.id">
        <strong>{{ msg.sender_name }}:</strong> {{ msg.message }}
      </div>
      <form @submit.prevent="sendMessage">
        <input v-model="newMessage" placeholder="Type a message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useNuxtApp } from '#app';
  
  const route = useRoute();
  const { $pusher } = useNuxtApp();
  const chatPartnerId = route.params.userId;
  const messages = ref([]);
  const newMessage = ref('');
  const chatPartner = ref({});
  
  // Fetch chat messages and partner's info on mount
  onMounted(async () => {
    await fetchChatMessages();
    await fetchChatPartner();
    subscribeToMessages();
  });
  
  async function fetchChatMessages() {
    const { data, error } = await $fetch(`/api/chatMessages?chatPartnerId=${chatPartnerId}`);
    if (!error) messages.value = data;
  }
  
  async function fetchChatPartner() {
    const { data, error } = await $fetch(`/api/profile/${chatPartnerId}`);
    if (!error) chatPartner.value = data;
  }
  
  function subscribeToMessages() {
    const channel = $pusher.subscribe(`chat-${chatPartnerId}`);
    channel.bind('message', (data) => {
      messages.value.push(data);
    });
  }
  
  async function sendMessage() {
    await $fetch('/api/messages', {
      method: 'POST',
      body: { text: newMessage.value, receiverId: chatPartnerId }
    });
    newMessage.value = '';
  }
  </script>
  