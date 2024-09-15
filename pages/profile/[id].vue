<template>
    <div v-if="profile" class="font-mono bg-stone-200 lg:h-screen p-2">
      <div class="lg:p-5 p-0.5 lg:flex lg:space-x-5">
        <div class="bg-black pr-1 pl-0.5 pt-0.5 pb-2 rounded-md w-fit">
          <div :class="['lg:w-96 h-full bg-gray-400 p-[7px] rounded-sm', getRealtionColor(profile.relationTerms.term_long)]">        
            <img :src="profile.profile_pic" alt="img" class="border-black border-2 rounded-md">
            <div class="py-4 hidden lg:block">
              <div class="flex space-x-1 font-semibold text-lg">
                <span class="capitalize">{{ profile.first_name }},</span>
                <span>{{ getAge(profile.date_of_birth) }}</span>
              </div>
              <div class="flex space-x-1">
                <Icon name="mingcute:location-fill" class="mt-1" />
                <div class="flex space-x-1 text-slate-600 capitalize">
                  <span>{{ profile.city }},</span>
                  <span>{{ profile.country }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-2 pt-3 px-2 lg:px-0 lg:pt-0 md:text-2xl text-lg">
          <div class="flex space-x-1">
            <span class="font-bold capitalize">{{ profile.first_name }} {{ profile.second_name }}</span>
            <span>{{ getAge(profile.date_of_birth) }}</span>
          </div>
          <div class="flex space-x-1">
            <Icon name="lets-icons:home-duotone" class="text-xl" />
            <div class="flex space-x-1 text-sm lg:text-xl font-semibold">
              <span>Lives in</span>
              <span class="capitalize">{{ profile.city }}</span>
            </div>
          </div>
          <div class="flex space-x-1">
            <Icon name="ic:round-cake" class="text-xl" />
            <span class="text-sm lg:text-xl">{{ formatDate(profile.date_of_birth) }}</span>
          </div>
          <div class="flex space-x-1">
            <Icon name="icons8:gender" class="text-xl mt-1" />
            <span class="text-sm lg:text-xl">{{ profile.gender.gender_name }}</span>
          </div>
          <div :class="['flex rounded-md lg:w-80 w-60 lg:p-2 p-0.5', getRealtionColor(profile.relationTerms.term_long)]">
            <span class="lg:text-3xl text-2xl mt-2">{{ profile.relationTerms.emoji }}</span>
            <div class="grid">
              <span class="text-xs lg:text-xl">Looking for:</span>
              <span class="font-semibold text-sm lg:text-xl">{{ profile.relationTerms.term_long }}</span>
            </div>
          </div>
          <hr class="bg-slate-400 lg:w-screen h-0.5">
          <div class="grid ">
            <span class="font-semibold">About Me</span>
            <span class="text-balance text-base lg:grid lg:grid-cols-3">{{ profile.description }}</span>
          </div>
          <button class="bg-red-400 p-2 flex justify-center">chat</button>
        </div>
                
      </div>

      
    </div>
    
    <div v-else class="text-center pt-40 ">
      <Icon  name="eos-icons:bubble-loading" class="text-blck" size="100"/>
      <span class="text-2xl py-4">Weeb Plz wait</span>
      </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  const client = useSupabaseClient()
  const profile = ref(null)
  const route = useRoute()
  
  // Fetch the user profile based on the route parameter (user_id)
  onMounted(async () => {
    const { id } = route.params
    const { data, error } = await client
      .from('profile')
      .select('*, gender:gender_id (gender_name), relationTerms:term_id(term_long, emoji)')
      .eq('user_id', id)
      .single();  // Fetches a single profile based on user_id (0-0 -- (ohh!))
  
    if (error) {
      console.error('Error fetching profile:', error)
    } else {
      profile.value = data
    }
  })
  
  // Helper functions
  function getAge(dob) {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()
    
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }
  
  function formatDate(dob) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date(dob)
    return `${date.getFullYear()}, ${months[date.getMonth()]} ${date.getDate()}`
  }
  
  const getRealtionColor = (termLong) => {
    switch (termLong) {
      case 'Long-term partner': return 'bg-red-300 text-red-950'
      case 'Short-term partner': return 'bg-green-300 text-green-950'
      case 'Short-term but long-term OK': return 'bg-yellow-300 text-yellow-950'
      case 'Still figuring out': return 'bg-sky-300 text-sky-950'
      default: return 'bg-gray-400'
    }
  }
  </script>
  