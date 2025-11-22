import { queue_of_upcoming_psot,queue_of_feild_postes,queue_of_Post_being_posted } from "../global.js";
import re_request_to_post from "./re_requesting_to_post.js";
import requesting_to_post from "./requesting_to_psot.js";
import axios from "axios";
export async function polling() {
    try {
        const now = new Date()
        const existing_post_in_queue = queue_of_upcoming_psot
        const request_to_get_post = await axios.get(`${process.env.API_CALL_URL}/api/FindUpcomingPost`)
        const { upcomingPost } = request_to_get_post.data
        
    
        if (!upcomingPost) {
            return
        }
        const newPosts = upcomingPost.filter(
            post => !existing_post_in_queue.some(p => String(p._id) === String(post._id))
    
        );
        const ids = newPosts.map((p)=>p._id )
        const update = await axios.put(`${process.env.API_CALL_URL}/api/ChangeScheduledPostState` ,{ids} )
        queue_of_upcoming_psot.push(...newPosts)

        await re_request_to_post()
        await requesting_to_post()

        console.log(queue_of_Post_being_posted,"post beign posted")
        console.log(queue_of_feild_postes , "post field")
        console.log(queue_of_upcoming_psot, "upcoming post ")


        
        
    } catch (error) {
        console.error(error)
        return 
    }
   
   

}   