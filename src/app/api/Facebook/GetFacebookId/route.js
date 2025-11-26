import axios from "axios";

export async function GET(request, response) {
    console.log('jo')
    const res = await axios.get(`https://graph.facebook.com/v24.0/me?fields=id,name,picture&access_token=EAAQrZC3oIWLUBQFUK21oD9bWLZCaZC0MHQ3sQUbtrhCyqTZAEIWJYQS9SvNeFsoe7TRJZBu2YGYuIg4RWxYpVouNXXPPQEQU9j7rRDhUVUWhYvBHNB27uDB8DIpGhqmiqAEcSEFBywFnwZBQLpbnOZCUTPQClOjixRGWjLTVqPOZBG777pLoZCRDXcoZBZAY35phVgT`)
    console.log(res.data)


    
}