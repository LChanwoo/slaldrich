import axios from 'axios';

const fetcher = async (url: string) => await axios.get(url, { withCredentials: true }).then((response) => response.data);

export default fetcher;
