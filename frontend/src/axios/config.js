import axios from "axios";

const HTTP_REQUEST = axios.create({
    baseURL: process.env.REACT_APP_API_URI
});

export default HTTP_REQUEST;