<template>
 
  <div class="bg-black px-0.5 pt-0.5 pb-2 w-fit rounded-md">
    <NuxtLink to="/" class="font-mono font-semibold p-2 bg-rose-300 rounded-sm">
      <-Goodu Lucku Weeboo ..♡\( =˃▿˂= )/♡..
    </NuxtLink>
  </div>

  <div class=" font-mono bg-stone-200 lg:h-screen   p-2 ">
    <div v-for="info in infos" :key="info.user_id" 
    class="lg:p-5 p-0.5 lg:flex lg:space-x-5">
    <NuxtLink to="/infoForm" class="absolute right-0 top-16 lg:top-32 lg:left-4 bg-black w-fit rounded-full px-0.5 pt-0.5 pb-1">
      <div class="bg-gradient-to-r from-yellow-300 to-purple-500 rounded-full w-fit h-14 p-2 border-[3px] border-dotted hover:bg-gradient-to-r hover:from-purple-500 hover:to-yellow-300 hover:border-orange-600">
        <span class="text-orange-950 font-semibold text-lg ">Edit</span>
      </div>
    </NuxtLink>
      <div class="bg-black pr-1 pl-0.5 pt-0.5 pb-2 rounded-md w-fit">
        <div :class="['lg:w-96 h-full bg-gray-400 p-[7px]  rounded-sm',
        getRealtionColor(info.relationTerms.term_long)]">        
        <img :src="info.profile_pic" alt="img" 
        class="border-black border-2 rounded-md ">
         <div class="py-4 hidden lg:block">
          <div class="flex space-x-1 font-semibold text-lg">
            <span class=" capitalize ">{{ info.first_name }},</span>
            <span> {{ getAge(info.date_of_birth) }} </span> 
          </div>
          <div class="flex space-x-1">
            <Icon name="mingcute:location-fill" class="mt-1"/>
            <div class="flex space-x-1 text-slate-600 capitalize">
              <span>{{ info.city }},</span>
              <span>{{ info.country }}</span>
            </div>
          </div>
         </div>
        </div>
      </div>
      <div class="space-y-2 pt-3 px-2 lg:px-0 lg:pt-0 md:text-2xl text-lg ">
        <div class="flex space-x-1 ">
          <span class="font-bold capitalize">{{ info.first_name }} {{ info.second_name }}</span>
          <span> {{ getAge(info.date_of_birth) }} </span> 
      </div>
      <div class="flex space-x-1">
        <Icon name="lets-icons:home-duotone" class="text-xl"/>
        <div class="flex space-x-1 text-sm lg:text-xl font-semibold">
          <span>Lives in </span>
          <span class="capitalize">{{ info.city }}</span>
        </div>
      </div>
      <div class="flex space-x-1">
        <Icon name="ic:round-cake" class="text-xl"/> 
        <span class="text-sm lg:text-xl">{{ formatDate(info.date_of_birth ) }}</span>
      </div>
      <div class="flex space-x-1">
        <Icon name="icons8:gender" class="text-xl mt-1"/>
        <span class="text-sm lg:text-xl">{{ info.gender.gender_name }}</span>
      </div>
      <div :class="['flex rounded-md lg:w-80 w-60  lg:p-2 p-0.5',
      getRealtionColor(info.relationTerms.term_long)]">
      <span class="lg:text-3xl text-2xl mt-2">{{ info.relationTerms.emoji }}</span>
        <div class="grid ">
          <span class="text-xs lg:text-xl">Looking for:</span>
        <span class="font-semibold text-sm lg:text-xl">{{ info.relationTerms.term_long }}</span>
        </div>
      </div>
      
        <hr class="bg-slate-400 lg:w-screen h-0.5">
        <div class="grid">
          <span class="font-semibold ">About Me</span>
          <span class="text-balance text-base lg:grid lg:grid-cols-3">{{ info.description }}</span>
        </div>
      </div>
    </div>
  </div>

 
</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter();

// Data variables
const infos = ref([]);
const errorMsg = ref(null);
const successMsg = ref(null);


// Fetch user data on mounted
onMounted(() => {
getWeebInfos();
});

// Fetch the user's profile data
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

// calculate age from DOB
function getAge(dob) {
const birthDate = new Date(dob);
const today = new Date();
let age = today.getFullYear() - birthDate.getFullYear();
const month = today.getMonth() - birthDate.getMonth();

if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
  age--;
}

return age;
}

// get month name
function formatDate(dob) {
const months = [
"January", "February", "March", "April", "May", "June", "July", 
"August", "September", "October", "November", "December"
];

const date = new Date(dob);
const year = date.getFullYear();  
const monthName = months[date.getMonth()];  
const day = date.getDate();  

return year + ", " + monthName + " " + day;

}

// change bg-color based on term_long
const getRealtionColor = (termLong) => {
console.log(`termLong: "${termLong}"`); // This will p
switch (termLong) {
  case 'Long-term partner':
    return 'bg-red-300 text-red-950';
  case 'Short-term partner':
    return 'bg-green-300 text-green-950';
  case 'Short-term but long-term OK':
    return 'bg-yellow-300 text-yellow-950';
  case 'Still figuring out':
    return 'bg-sky-300 text-sky-950';
  default:
    return 'bg-gray-400';
}
}


</script>
