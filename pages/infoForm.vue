<template>
  <!-- <div class="bg-[url('https://e1.pxfuel.com/desktop-wallpaper/513/437/desktop-wallpaper-psychedelic-anime-trippy-girl.jpg')]"></div> -->
  <span>{{ successMsg }}</span>
  <span> {{ successMsgPic }} </span>
  <span> {{ errorMsgPic }} </span>
  <span>{{ errorMsg }}</span>
  <!-- <div style="background-image: url('https://img.freepik.com/premium-photo/gamepad-style-pop-art-anime_763713-759.jpg');"></div> -->
  <div class="p-3 flex justify-center  ">
    
    <div class=" bg-black px-0.5 pt-0.5 pb-2 rounded-md w-fit">
      <form @submit.prevent="weebInfo" class="grid lg:gap-8 flex-col space-y-3 p-5 bg-rose-300 rounded-md  w-fit font-mono  ">

        <div class="lg:flex lg:space-x-5 grid gap-3">
         <div id="First Name" class="lg:grid gap-1">
           <label class="font-semibold lg:text-lg text-sm">>First Name</label>
           <div class=" bg-black px-0.5 pt-0.5 pb-1 rounded-md w-fit">
             <input v-model="firstName" type="text" class="lg:p-1  bg-amber-300 outline-none rounded-sm border-2 border-dotted border-red-800">
           </div>
         </div>

         <div id="Second Name" class="Lg:grid gap-1">
           <label class="font-semibold lg:text-lg text-sm">>Second Name</label>
           <div class="bg-black px-0.5 pt-0.5 pb-1 rounded-md w-fit">
             <input v-model="secondName" type="text" class="lg:p-1 bg-teal-400 outline-none rounded-sm border-2 border-dotted border-yellow-400">
           </div>
         </div>
        </div>
        <div class="lg:flex lg:space-x-5 grid gap-3 ">
          <div class="lg:grid gap-1">
            <label class="font-semibold lg:text-lg text-sm">>Country</label>
            <div class="bg-black px-0.5 pt-0.5 pb-1 rounded-md w-fit">
              <input v-model="country" type="text" class="lg:p-1 bg-violet-400 outline-none rounded-sm border-2 border-dotted border-red-800">
            </div>
          </div>
 
          <div class="lg:grid gap-1">
            <label class="font-semibold lg:text-lg text-sm">>City</label>
            <div class="bg-black px-0.5 pt-0.5 pb-1 rounded-md w-fit">
              <input v-model="city" type="text" class="lg:p-1 bg-fuchsia-400 outline-none rounded-sm border-2 border-dotted border-yellow-400">
            </div>
          </div>
         </div>
    
         <div class="lg:grid gap-1">
           <label class="font-semibold lg:text-lg text-sm">>Birth Date</label>
           <div class="bg-black px-0.5 pt-0.5 pb-1 rounded-md w-fit">
             <input v-model="dob" type="date" class="lg:p-1 rounded-sm border-2 border-dotted border-black">
           </div>
         </div>
         <!-- genders -->
         <div id="Genders">
          <label class="font-semibold lg:text-lg text-sm">>Gender</label>
       
           <div class=" grid grid-cols-2  lg:grid-cols-3 gap-y-2">
            <div v-for="gender in genders" :key="gender.gender_id" class=" bg-black px-0.5 pt-0.5 pb-1 rounded-md w-fit">
              <div :class="['space-x-1 lg:p-1 p-0.5 rounded-md border-2 border-black border-dotted w-28 ',
                            genderBackground(gender.gender_id)]">
                <input class="accent-orange-400 w-3" v-model="selectedGender" type="radio" :value="gender.gender_id" name="gender" >
              <label class="text-sm lg:text-base">{{gender.gender_name}}</label>
              </div>
             </div> 
           </div>
           

         </div>
        <!-- realtion terms -->
        
          <div id="Terms">
            <label  class="font-semibold lg:text-lg text-sm">>Relationship Term</label>
            <div  class=" bg-black px-0.5 pt-0.5 pb-1 rounded-md w-fit">
              <div  class=" border-2 border-dotted border-black bg-red-400 p-1">
                <select v-model="selectedTerm"  class="rounded-md lg:h-fit lg:text-base h-5 text-xs p-1">
                  <option v-for="term in terms" :key="term.term_id" :value="term.term_id" >
                    {{term.term_long}}
                    {{ term.emoji }}
                    
                  </option>
                </select>
              </div>
            </div> 
          </div>
          
          
         <div class="grid gap-1">
          <label class="font-semibold lg:text-lg text-sm">>Profile Image</label>
         <div class=" bg-black px-0.5 pt-0.5 pb-1 rounded-md w-fit">
          <input class=" bg-red-400 rounded-xl border-2 border-dotted border-black" 
          type="file" @change="uploadProfilePic" accept="image/*" alt="profile Image Preview">

         </div>
           <div v-if="uploadProfilePic" class="mt-4">
            <Icon v-if="uploading" name="eos-icons:bubble-loading" class="text-blck" size="40"/>
            <div v-else><img :src="profile_pic" alt="img" class="w-20 h-20"></div>
           </div>
         </div>
   
         <div class="grid gap-1">
          <label class="font-semibold lg:text-lg text-sm">>About Me</label>
          <div class="bg-black px-0.5 pt-0.5 pb-1 rounded-md w-fit">
            <textarea v-model="description" type="text" class="text-sm p-1 bg-cyan-400 outline-none rounded-sm border-2 border-dotted border-black lg:w-96 w-72 h-40"/>
          </div>
        </div>

        <div class="flex justify-center ">
          <!-- <img class="w-40"
           src="https://i.pinimg.com/originals/1f/79/aa/1f79aa400b08e4439468b6d2d79837c7.jpg" alt=""> -->
          <div class="bg-black px-0.5 pt-0.5 pb-1 rounded-md ">
            <button type="submit" class=" bg-green-400 lg:w-fit w-28 text-center  rounded-sm border-2 border-dotted border-black ">Submit</button>
          </div>
        </div>

        </form>
    </div>

   
    </div>
</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter();

// Profile form data
const firstName = ref('')
const secondName = ref('')
const dob = ref('')
const city = ref('')
const country = ref('')
const selectedGender = ref(null)
const genders = ref([])
const selectedTerm = ref(null)
const terms = ref([])
const profile_pic = ref('')
const uploading = ref(false)
const description = ref('')

// Messages
const errorMsg = ref(null);
const successMsg = ref(null);
const errorMsgPic = ref(null);
const successMsgPic = ref(null);

// Quickly display genders and terms
onMounted(() => {
  getGenders();
  getRelationTerms();
  getWeebInfos();
});

// Fetch genders
async function getGenders() {
  try {
    const { data, error } = await client.from('gender').select('*')
    if (error) {
      console.error('Oops Error fetching genders', error);
    } else {
      genders.value = data;
      console.log('Genders fetched:', genders.value);  // For debugging purposes
    }
  } catch (err) {
    console.error('Error fetching genders:', err);
  }
}


const genderBackground = (genderId) => {
  switch (genderId) {
    case 1:
      return 'bg-red-400';
    case 2:
      return 'bg-blue-400';
    case 3:
      return 'bg-green-400';
    case 4:
      return 'bg-yellow-400';
    case 5:
      return 'bg-purple-400';
    case 6:
      return 'bg-pink-400';
    default:
      return 'bg-gray-400';
  }
};
// Fetch relation terms
async function getRelationTerms() {
  const { data, error } = await client.from('relationTerms').select('*')
  if (error) {
    console.error('Oops Error fetching terms', error);
  } else {
    terms.value = data;
  }
}

// Fetch existing profile data (if any)
async function getWeebInfos() {
  try {
    const { data, error } = await client
      .from('profile')
      .select('*, gender:gender_id (gender_name), relationTerms:term_id(term_long)')
      .eq('user_id', user.value.id)
    if (error) {
      console.error('Error Retrieving Data', error);
    } else if (data.length > 0) {
      const profile = data[0];
      // Prefill form with existing data
      firstName.value = profile.first_name;
      secondName.value = profile.second_name;
      city.value = profile.city;
      country.value = profile.country;
      dob.value = profile.date_of_birth;
      selectedGender.value = profile.gender_id;
      selectedTerm.value = profile.term_id;
      profile_pic.value = profile.profile_pic;
      description.value = profile.description;
    }
  } catch (error) {
    console.error('Error fetching profile data', error);
  }
}

// Upload profile picture
async function uploadProfilePic(event) {
  const file = event.target.files[0];
  if (file) {
    try {
      uploading.value = true;
      const fileName = `${user.value.id}-${Date.now()}-${file.name}`;
      const { data, error } = await client.storage.from('profile_pics').upload(fileName, file);

      if (error) {
        errorMsgPic.value = 'Failed to Upload Profile Picture';
        return;
      }

      const { data: publicURLData, error: publicURLError } = client.storage.from('profile_pics').getPublicUrl(fileName);
      if (publicURLError) {
        errorMsgPic.value = 'Failed to Retrieve Profile Picture URL';
        return;
      }

      profile_pic.value = publicURLData.publicUrl;
      successMsgPic.value = 'Profile Picture Uploaded Successfully';
    } catch (err) {
      errorMsgPic.value = 'Unexpected error occurred while uploading';
    } finally {
      uploading.value = false;
    }
  } else {
    errorMsgPic.value = 'No file selected for upload';
  }
}

// Insert or Update profile
async function weebInfo() {
  try {
    // Check if profile exists
    const { data: existingProfile, error: fetchError } = await client
      .from('profile')
      .select('*')
      .eq('user_id', user.value.id)
    
    if (fetchError) throw fetchError;

    if (existingProfile.length > 0) {
      // Update existing profile
      const { error } = await client
        .from('profile')
        .update({
          first_name: firstName.value,
          second_name: secondName.value,
          city: city.value,
          country: country.value,
          term_id: selectedTerm.value,
          date_of_birth: dob.value,
          gender_id: selectedGender.value,
          profile_pic: profile_pic.value,
          description: description.value
        })
        .eq('user_id', user.value.id);

      if (error) throw error;
      successMsg.value = 'Profile updated successfully!';
    } else {
      // Insert new profile
      const { error } = await client
        .from('profile')
        .insert({
          user_id: user.value.id,
          first_name: firstName.value,
          second_name: secondName.value,
          city: city.value,
          country: country.value,
          term_id: selectedTerm.value,
          date_of_birth: dob.value,
          gender_id: selectedGender.value,
          profile_pic: profile_pic.value,
          description: description.value
        });

      if (error) throw error;
      successMsg.value = 'Profile created successfully!';
    }
    
    // Redirect to profile page
    router.push({ name: 'profilePage', params: { user_id: user.value.id } });
  } catch (error) {
    errorMsg.value = 'Error occurred while saving profile.';
  }
}
</script>


