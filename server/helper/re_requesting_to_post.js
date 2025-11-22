import { queue_of_feild_postes } from "../global.js";
export default async function re_request_to_post() {
    console.log('re request to post called ')
  
    while (queue_of_feild_postes.length > 0) {
        const element = queue_of_feild_postes[0]; // first element
        try {
            const res = await axios.post(
                `${process.env.API_CALL_URL}/api/${element.platform}/post?socialAccountId=${element.socailAccount_id}`,
                { formData: element }
            );
            queue_of_feild_postes.splice(0, 1)
            
        } catch (err) {
            queue_of_feild_postes.push(element);
        }
    }
    console.log('re-request end')
}