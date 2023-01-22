import axios from "axios";

const HTTP_REQUEST = axios.create({
    baseURL: "http://localhost:3001"
});

export default HTTP_REQUEST;