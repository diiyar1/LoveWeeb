<template>
    <div class=" bg-black px-0.5 pt-0.5 pb-1 ">
        <nav 
        class=" hidden h-14 lg:h-fit w-[100%] bg-purple-500 border-4 border-dashed border-yellow-500 p-3  font-mono lg:flex lg:justify-between">
     
          
        <div class="flex space-x-6 ">
            <!-- justice for weebs -->
            <NuxtLink to="/"><h1 class="text-xl font-bold"> Love4Weebs</h1></NuxtLink>
            <div class="flex space-x-6 pt-1 text-slate-200 font-semibold ">
               <div class=" transition ease-in-out delay-75 hover:translate-y-1 hover:scale-110 duration-100 hover:text-yellow-300 cursor-pointer  "><span class="hover:shadow-md ">Premium</span></div>
                <div class="transition ease-in-out delay-75 hover:translate-y-1 hover:scale-110 duration-100 hover:text-yellow-300 cursor-pointer  "><span class="hover:shadow-md">Contacts</span></div>
                <div class="transition ease-in-out delay-75 hover:translate-y-1 hover:scale-110 duration-100 hover:text-yellow-300 cursor-pointer  "><span class="hover:shadow-md">FAQ</span></div>
                <div class="transition ease-in-out delay-75 hover:translate-y-1 hover:scale-110 duration-100 hover:text-yellow-300 cursor-pointer  "><span class="hover:shadow-md">Support</span></div>
            <NuxtLink class="transition ease-in-out delay-75 hover:translate-y-1 hover:scale-110 duration-100 hover:text-yellow-300 cursor-pointer  " to="/profilePage"> <span class="hover:shadow-md">Profile</span></NuxtLink>
            </div>
        </div>

        <div class="flex space-x-4">
            <div v-if="!user" class=" bg-black pt-0.5 pb-1 px-0.5 rounded-md  w-fit h-fit ">
                <button @click="login('google')"
                class="bg-teal-400 rounded-sm w-fit h-fit p-2 text-slate-800">Come In </button>
            </div>
            <div v-if="user" class=" bg-black pt-0.5 pb-1 px-0.5 rounded-md  w-fit h-fit ">
                <button @click="logout()"
                class="bg-red-400 rounded-sm w-fit h-fit p-2 text-slate-800">Leave Peacefully </button>
            </div>
            
        </div>

        <!-- <div >
            <h1 class="text-center">Create account</h1>
            <form
              @submit.prevent="signUp"
              class="mt-7 w-4/5 m-auto p-10 border border-slate-700 rounded-md flex flex-col"
            >
              <span
                class="text-sm ml-1 mt-1 text-green-800 bg-green-400 px-2 rounded-md"
                >{{ successMsg }}</span
              >
              <label class="block text-sm md:text-base md:pb-2" for="Email"
                >Enter email address</label
              >
              <input
                class="bg-slate-300 md:bg-slate-200 w-full p-3 mt-1 rounded-lg outline-transparent"
                type="email"
                placeholder="youremail@example.com"
                v-model="email"
              />
              <span class="text-sm ml-1 mt-1 text-red-600"></span>
              <label class="block text-sm md:text-base md:pb-1 mt-3" for="password"
                >Password</label
              >
              <input
                class="bg-slate-300 md:bg-slate-200 text-sm w-full p-3 mt-1 rounded-lg outline-transparent"
                type="password"
                placeholder="Enter password here"
                v-model="password"
              />
              <span class="text-sm ml-1 mt-1 text-red-600">{{ errorMsg }}</span>
              <button
                type="submit"
                class="px-4 py-2 text-white bg-indigo-600 rounded-md mt-7 m-auto"
              >
                Sign up
              </button>
            </form>
          </div> -->
          
        </nav>
    </div>

    
    <div class="lg:hidden w-fit bg-black px-0.5 pt-0.5 pb-10">
        <nav class="flex w-full justify-between bg-gradient-to-r from-amber-200 to-purple-500 border-2 border-dashed  border-black z-20 absolute top-0 left-0 ">
            
            <div class=" grid bg-blue-900 pr-1 py-0.5 rounded-r-md  w-fit">
                <div  class="bg-amber-200  border-2 border-dashed border-blue-800 rounded-sm">
                    <!-- <div> -->
                        <button @click="openMenu" class="ml-1 pt-0.5 ">
                            <Icon v-if="!menuOpened"  name="mdi:hamburger-open" size="26"/>
                        </button>
                        
                            <button @click="menuOpened = false" class="ml-4 mt-2 bg-red-200 border-2 border-slate-500 rounded-full shadow-lg"> 
                                <Icon class="text-red-700 shadow-md" v-if="menuOpened" name="mingcute:close-fill" size="26"/>
                            </button>
                        

                    <!-- </div> -->
                    <div v-if="menuOpened" class=" w-screen ">
     
                            <div class="grid gap-5 pt-1 text-slate-700 font-semibold p-4 pl-6">
                                <div class=" transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-100 hover:text-blue-800 cursor-pointer  "><span class=" ">Premium</span></div>
                                 <div class="transition ease-in-out delay-75 hover:translate-y-1 hover:scale-110 duration-100 hover:text-blue-800 cursor-pointer  "><span class="">Contacts</span></div>
                                 <div class="transition ease-in-out delay-75 hover:translate-y-1 hover:scale-110 duration-100 hover:text-blue-800 cursor-pointer  "><span class="">FAQ</span></div>
                                 <div class="transition ease-in-out delay-75 hover:translate-y-1 hover:scale-110 duration-100 hover:text-blue-800 cursor-pointer  "><span class="">Support</span></div>
                             <NuxtLink class="transition ease-in-out delay-75 hover:translate-y-1 hover:scale-110 duration-100 hover:text-blue-800 cursor-pointer  " to="/profilePage"> <span class="">Profile</span></NuxtLink>
                             <div class="flex space-x-4">
                                <!-- <div class="bg-black pt-0.5 pb-1 px-0.5 rounded-md  w-fit h-fit ">
                                    <button class="bg-teal-400 rounded-sm w-fit h-fit p-2">Login </button>
                                </div> -->
                                <div v-if="user" class=" bg-black pt-0.5 pb-1 px-0.5 rounded-md  w-fit h-fit ">
                                    <button @click="logout()"
                                    class="bg-red-400 rounded-sm w-fit h-fit p-2 text-slate-800">Leave Peacefully </button>
                                </div>
                                <div v-if="!user" class=" bg-black pt-0.5 pb-1 px-0.5 rounded-md  w-fit h-fit ">
                                    <button @click="login('google')"
                                    class="bg-teal-400 rounded-sm w-fit h-fit p-2 text-slate-800">Come In </button>
                                </div>
                            </div>
                    
                            </div>
                    </div>
                </div>
            </div>
            <div>
                <NuxtLink to="/"><h1 class="pt-2 font-bold"> Love4Weebs</h1></NuxtLink>
            </div>

        </nav>
        
    </div>
    
    <NuxtPage />

</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// open menu
const menuOpened = ref(false)
function openMenu() {
    menuOpened.value = true
}



//login with provider(s)
const login = async (prov)=>{
    const {data, error} = await client.auth.signInWithOAuth({provider : prov})

    if (error) {
        console.log("Error Have Been Dedected:",error);
        
    } else {
        console.log("Sign In Have Been Succesfuk",data);
        
    }
    
}

// logout
async function logout() {
    try {
        const {error} = await client.auth.signOut({})

        if (error) throw error
        router.push('/')
    } catch (error) {
        console.log(error);
        
    }
}

const email = ref('')
const password = ref(null)
const errorMsg = ref(null)
const successMsg = ref(null)

const signUp = async()=>{
  try {
    const {data, error} = await client.auth.signUp({
      email: email.value,
      password: password.value
    })
    if (error) throw error

    router.push('/infoForm')

  } catch (error) {
    errorMsg.value = error.message
  }
}

</script>
