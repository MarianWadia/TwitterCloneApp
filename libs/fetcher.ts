import axios from "axios";

const fetcher = (url: string) => axios(url).then((response) => response.data)

export default fetcher;