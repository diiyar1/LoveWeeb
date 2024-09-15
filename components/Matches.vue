<template>
    <div class="grid gap-2">
      <h2 class="underline decoration-red-400">Matches</h2>
      <div v-if="matches.length > 0" >
        <button v-for="match in matches" :key="match.user_id_2" class="grid ">
        
          <div class="flex space-x-2 py-1 pl-1 capitalize">
            <div class="bg-black pr-1 pb-0.5 pt-0.5 rounded-full w-fit">
              <img :src="match.profile.profile_pic" alt="img" 
              class=" rounded-full  w-8 h-8 ">
            </div>            
            <span class="mt-2 font-semibold">{{ match.profile.first_name }} {{ match.profile.second_name }}</span>
        </div>
      </button>
        
      </div>
      
      <div v-else>
        <p>No matches yet</p>
      </div>
    </div>
    
  </template>
  
  <script setup>
  const client = useSupabaseClient()
  const user = useSupabaseUser()
  const matches = ref([])
  
  // Fetch matches for the authenticated user

  
  async function getMatches() {
    try {
      const { data, error } = await client
        .from('matches')
        .select(`
          *,
          profile:user_id_2 (
            first_name,
            second_name,
            profile_pic
          )
        `)
        .eq('user_id_1', user.value.id)   // Current user is the swiper
        .eq('is_mutual', true);            // Show only mutual matches
  
      if (error) {
        console.error('Error fetching matches:', error);
        return;
      }
      console.log('Matches data:', data);
       matches.value = data;

    } catch (error) {
      console.error('Error retrieving matches:', error);
    }
  }
 

// Automatically fetch matches when `user.value.id` changes or the component mounts
watchEffect(() => {
  if (user.value?.id) {
    getMatches();
  }
});
  </script>
  