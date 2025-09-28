// lib/fetcher.js
import axios from 'axios';
export const useSecureFetcher = () => {
  

    return async (url) => {
     
        const res = await axios.get(url);
        return res.data;
    };
};