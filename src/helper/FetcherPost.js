
import axios from 'axios';

export const FetcherPost =(url,payload) => axios.post(url, payload).then(res => res.data);