import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5001/clone-7b53f/us-central1/api",
  baseURL: "https://us-central1-clone-7b53f.cloudfunctions.net/api",
});

export default instance;
