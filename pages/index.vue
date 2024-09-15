<template>
  <!-- <div v-if="user" class="grid font-mono text-center ">Your Weeboo Email 
  <span>{{ user.email }}</span>  
  </div> -->
    <div class=" ">
      <LoveWeebs/>
    </div>

    <div v-if="user" class="pt-10 absolute  lg:right-96">
        <div  v-for="info in infos" :key="info.user_id" class="swipe-card">
            <WeebCard :info="info"
            @swipe-left="onSwipeLeft(info)"
            @swipe-right="onSwipeRight(info)"
            />  
        </div>
     </div>
     
   <div v-else class=" text-center font-mono font-bold text-xl">
    <span >Not Authnticated ( ｡ •` ⤙´• ｡)  GO/</span>
    <div class="  bg-gradient-to-br from-yellow-300 to-violet-400 w-full  h-screen ">
    <div class=" lg:flex h-80">
      <img  src="https://imgs.search.brave.com/q1fUJ6jENnOFBgU3H0hbG5bPZEnZv_0jM5NMHFsRcX4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/c2hvcGlmeS5jb20v/cy9maWxlcy8xLzA2/MDIvMjYxNy81MjI0/L2ZpbGVzL2I3NTdk/Yzk2LTljZTktNDc3/ZC05MTk4LTRlNmU4/NTVmM2QwNV82MDB4/NjAwLnBuZz92PTE2/ODIzNzcxNjY" alt="">
      <img src="https://i1.sndcdn.com/artworks-000651180028-8qjafy-t500x500.jpg" alt="">
      <img src="https://i.ytimg.com/vi/8924UO3kwow/maxresdefault.jpg" alt="">
    </div> 
    <div class=" lg:flex w-96 ">
      <img src="https://miro.medium.com/v2/resize:fit:1358/1*EaypZ7liisVbMqXIjsoQxg.png" alt="">
      <img src="https://e0.pxfuel.com/wallpapers/747/578/desktop-wallpaper-otaku-anime-windows.jpg" alt="">
      <img src="https://traditionalcatholicweeb.files.wordpress.com/2020/11/1181191-illustration-anime-anime-girls-grass-sky-wind-windows-xp-microsoft-windows-lucky-star-izumi-konata-grassland-meadow-plain-screenshot-computer-wallpaper.jpg?w=1108&h=737&crop=1" alt="">
    </div>
    </div>
  </div>

  <div v-if="user && infos.length === 0" class="text-center font-mono font-bold text-xl capitalize grid ">
    <span>No one left to swipe!🎉</span>
    <span>Arigatou Gusiamusu</span>
  </div>
  
   
</template>

<script setup>
import WeebCard from '~/components/WeebCard.vue'
import LoveWeebs from '~/components/LoveWeebs.vue';
const client = useSupabaseClient()
const user = useSupabaseUser()
const infos = ref([]);

// functions
onMounted(() => {
  getWeebInfos();
  
});

// Watch for changes in `infos` and log for debugging
watchEffect(() => {
  console.log('Updated profiles:', infos.value);
});


// Fetch the user's profile data
async function getWeebInfos() {
  try {
    const { data, error } = await client
      .from('profile')
      .select('*, gender:gender_id (gender_name), relationTerms:term_id(term_long, emoji)')
      .neq('user_id', user.value.id)
      .not('user_id', 'in', `(${await getSwipedUsers()})`); // Exclude users already swiped on

    if (error ) {
      console.error('Error Retrieving Ur Data, Weeb', error);
      console.log('no user signed in');
      
      return;
      
    } 

    infos.value = data;

  } catch (error) {
    console.error('Error Retrieving Ur Data, Weeb', error);
  }
}

async function getSwipedUsers() {
  const { data, error } = await client
    .from('matches')
    .select('user_id_2')
    .eq('user_id_1', user.value.id);

  if (error) {
    console.error('Error fetching swiped users:', error);
    return [];
  }

  return data.map(match => match.user_id_2); // Return a filtered array of user IDs already swiped on
}
// swipe functions
function onSwipeLeft(info){
  console.log(`Rejected: ${info.first_name}`)
  infos.value = infos.value.filter(i => i.user_id !== info.user_id);
}

async function onSwipeRight(info) {
  console.log(`Accepted: ${info.first_name}`)
  try {
    // Check if the swiped user has already swiped right on the current user
    const { data, error } = await client
      .from('matches')
      .select('*')
      .eq('user_id_1', info.user_id)  // Check if they swiped right on you
      .eq('user_id_2', user.value.id);  // You are the current user

    if (error) {
      console.error('Error checking match:', error);
      return;
    }

    if (data.length > 0) {
      // If the other user has swiped right, it's a mutual match
      await client
        .from('matches')
        .update({ is_mutual: true })
        .eq('user_id_1', info.user_id)
        .eq('user_id_2', user.value.id);

      console.log('It\'s a mutual match!');
    } else {
      // Otherwise, insert a new match with is_mutual set to false
      await client
  .from('matches')
  .upsert([{ user_id_1: user.value.id, user_id_2: info.user_id, is_mutual: true }], { onConflict: ['user_id_1', 'user_id_2'] });
  console.log(`Attempting to upsert match with user_id_1: ${user.value.id}, user_id_2: ${info.user_id}`);
  infos.value = infos.value.filter(i => i.user_id !== info.user_id);
      console.log('Swipe right recorded');
    }
  } catch (error) {
    console.log('Error while swiping right:', error);
  }
}



</script>
<style>
.swipe-card {
  position: relative;
  transition: transform 0.3s ease-in-out;
}
</style>
