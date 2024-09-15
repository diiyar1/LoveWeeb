<template>
    <header class="font-mono ">
        <div v-for="info in infos" :key="info.user_id" class="bg-black pt-0.5 p-1 pb-1 w-fit rounded-r-md">
            <div class="flex space-x-1 bg-red-400 w-80 rounded-r-sm p-1 px-2 border-black border-2 border-dotted">
                <div class="bg-black pr-1 pb-0.5 pt-0.5 rounded-full w-fit">
                  <img :src="info.profile_pic" alt="img" 
                  class=" rounded-full  w-8 h-8 ">
                </div>  
                <span class="mt-1 capitalize font-semibold text-lg">{{info.first_name}} {{info.second_name}}</span>
            </div>
        </div>
        <div class="flex  space-x-5 pt-1 px-2">
            <div id="Matches"  >
             
                <Matches/>
            </div>
            <div id="Chate" >
              
                <Chats/>
            </div>
        </div>
    </header>
</template>

<script setup>
import Matches from '~/components/Matches.vue';
import Chats from '~/components/Chats.vue';


const client = useSupabaseClient()
const user = useSupabaseUser()

const infos = ref([]);
onMounted(() => {
getWeebInfos();
});

async function getWeebInfos() {
try {
  const { data, error } = await client
    .from('profile')
    .select('*, gender:gender_id (gender_name), relationTerms:term_id(term_long, emoji)')
    .eq('user_id', user.value.id);

  if (error) {
    console.error('Error Retrieving Ur Data, Weeb', error);
    return;
  }

  infos.value = data;
} catch (error) {
  console.error('Error Retrieving Ur Data, Weeb', error);
}
}


</script>

