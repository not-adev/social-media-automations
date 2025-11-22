import { 
  queue_of_Post_being_posted,
  queue_of_feild_postes,
  queue_of_upcoming_psot
} from "../global.js";

import axios from "axios";

export default async function requesting_to_post() {

    // If posting queue is empty → load upcoming queue
    if (queue_of_Post_being_posted.length < 1) {
        queue_of_Post_being_posted.push(...queue_of_upcoming_psot);
        queue_of_upcoming_psot.length = 0; // clear upcoming queue
    }


    while (queue_of_Post_being_posted.length > 0) {

        const element = queue_of_Post_being_posted[0]; // first element
        queue_of_Post_being_posted.splice(0, 1);       // remove it

        try {
            const res = await axios.post(
                `${process.env.API_CALL_URL}/api/${element.platform}/post?socialAccountId=${element.socailAccount_id}`,
                { formdata: element }
            );

            if (res.status !== 200) {
                queue_of_feild_postes.push(element);
            }
            //  const changingStateOfScheduledPost = await axios.put(`${process.env.API_CALL_URL}/api/ChangeScheduledPostState` , {

            //  })
            console.log('re_quest to post ')

        } catch (err) {
            queue_of_feild_postes.push(element);
        }
    }
}
