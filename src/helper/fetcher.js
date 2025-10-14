import axios from "axios";
const Getfetcher = async (url) => {
  const res = await axios.get(url);
  return res.data.data;
};
export default Getfetcher ;

