'use server'
import axios from "axios"
import fs from 'fs'
export const UploadImageOnTwiter = async (imagePath, accessToken) => {
    console.log('image upolad on twitter hit ')
    const media_data = fs.readFileSync(imagePath).toString("base64")
    const res = await axios.post('https://upload.twitter.com/1.1/media/upload.json',
        new URLSearchParams({ media_data: media_data }),
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }
    )

    console.log(res.data.media_id_string)
    return res.data.media_id_string;


}