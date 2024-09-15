<template>
    <div class="card">
      <NuxtLink :to="`/profile/${info.user_id}`" >
        <div class="block p-4 font-mono">
          <div class="bg-black pb-2 pl-0.5 pt-0.5 pr-1 w-fit rounded-lg">
              <div :class="['relative pt-3 px-2 pb-4 rounded-md',
              getRealtionColor(info.relationTerms.term_long)]">
                   <div> 
                      
                        <img class=" w-64 h-72 ring-2 ring-black rounded-md" 
                             :src="info.profile_pic"/>
  
                      <div  @touchstart="startSwipe" 
                            @touchmove="moveSwipe" 
                            @touchend="endSwipe" 
                            class=" flex space-x-7 absolute  top-[280px] left-[90px] "> 
                          <div class="bg-black pb-1 px-0.5 pt-0.5 w-fit rounded-lg transition ease-in-out delay-75 hover:translate-y-1 hover:scale-110 duration-100 hover:text-rose-700 cursor-pointer">
                            <div class="bg-green-200 p-2 w-fit rounded-md h-8">
                              <Icon class="" name="mingcute:close-fill"/>  
                            </div>
                          </div>
                          <div class="bg-black pb-1 px-0.5 pt-0.5 w-fit rounded-lg transition ease-in-out delay-75 hover:translate-y-1 hover:scale-110 duration-100 text-rose-500 hover:text-red-600 cursor-pointer">
                            <div class="bg-pink-300  p-2 w-fit rounded-md h-8">
                              <Icon class="" name="solar:heart-bold"/>  
                            </div>
                          </div>
                      </div>
                      <div>
                          <div class="flex  mt-7 text-lg font-bold capitalize">
                              <span class=" ">{{info.first_name}}</span>
                              <span class="px-2">{{info.second_name}},</span>
                              <span>{{ getAge(info.date_of_birth) }}</span>
                          </div>
                          <div class="flex space-x-1">
                              <Icon name="mingcute:location-fill" class="mt-1"/>
                              <div class="flex space-x-1 text-slate-800 capitalize">
                                <span>{{ info.country }}</span>
                              </div>
                            </div>
                          <p class="text-xs line-clamp-2 w-60 h-30">{{info.description}}</p>
                      
                      </div>
                      </div> 
                     
                  </div>
          </div>
        </div>
      </NuxtLink>
    </div>
</template>

<script setup>
// child component
const props = defineProps(['info'])
const {info} = toRefs(props)

// Define emits for swipe events
const emit = defineEmits(['swipe-left', 'swipe-right'])

const startX = ref(0)
const currentX = ref(0)

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

const getRealtionColor = (termLong) => {
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

// Swipe handlers for touch events
function startSwipe(event) {
  startX.value = event.touches ? event.touches[0].clientX : event.clientX
}

function moveSwipe(event) {
  currentX.value = event.touches ? event.touches[0].clientX : event.clientX
}

function endSwipe() {
  const swipeDistance = currentX.value - startX.value
  
  if (swipeDistance > 100) {
    emit('swipe-right')
  } else if(swipeDistance < -100){
    emit('swipe-left')
  }
}

// Add event listeners for mouse events
function addMouseEvents() {
  window.addEventListener('mousedown', startSwipe)
  window.addEventListener('mousemove', moveSwipe)
  window.addEventListener('mouseup', endSwipe)
}

function removeMouseEvents() {
  window.removeEventListener('mousedown', startSwipe)
  window.removeEventListener('mousemove', moveSwipe)
  window.removeEventListener('mouseup', endSwipe)
}

onMounted(() => {
  // Add mouse event listeners when component is mounted
  addMouseEvents()
})

onUnmounted(() => {
  // Remove mouse event listeners when component is unmounted
  removeMouseEvents()
})

</script>


<style>
.card {
  transition: transform 0.3s ease-in-out;
}
</style>