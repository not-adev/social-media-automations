import { queue_of_feild_postes } from "../global.js";
export default async function re_request_to_post() {
    const element = queue_of_feild_postes[0]; // first element
    while (queue_of_feild_postes.length > 0) {


        try {
            // const res = await axios.post(
            //     `${process.env.API_CALL_URL}/api/${element.platform}/post`,
            //     { formdata: element }
            // );
            queue_of_feild_postes.splice(0, 1)
            console.log('re_reuest to post')

        } catch (err) {
            queue_of_feild_postes.push(element);
        }
    }
}