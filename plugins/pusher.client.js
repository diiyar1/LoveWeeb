import Pusher from "pusher-js";

export default defineNuxtPlugin(()=>{
    const pusher = new Pusher('93ac91d40b5755e7bfbc',{
        cluster: 'ap1'
    })

    return{
        provide: {
            pusher
        }
    }
})