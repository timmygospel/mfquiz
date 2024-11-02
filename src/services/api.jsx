import axios from "axios"
const API_BASE_URL = import.meta.env.VITE_REACT_APP_DATA_SERVER;

const newClient = () => {
    return axios.create({
        baseURL: `http://${API_BASE_URL}`,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const newMediaClient = () => {
    return axios.create({
        baseURL: `http://${API_BASE_URL}`,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


const newTextClient = () => {
    return axios.create({
        baseURL: `http://${pAPI_BASE_URL}`,
        headers: {
            "Content-Type": "text/plain",
        },
            
    });
};

const get = async (endpoint, body) => {
    let client = newClient();
    console.log("get client ", client);
    return await client.get(endpoint, body);
};

const put = async (endpoint, body) => {
    let client = newClient();
    return await client.put(endpoint, body);
};

const putText = async (endpoint, body) => {
    let client = newTextClient();
    return await client.put(endpoint, body);
};

const post = async (endpoint, body) => {
    let client = newClient();
    return await client.post(endpoint, body);
};

const postMedia = async (endpoint, body) => {
    let client = newMediaClient();
    return await client.post(endpoint, body);
};

const remove = async (endpoint, body) => {
    let client = newClient();
    return await client.delete(endpoint, body);
};



const API = {
    get: get,
    put: put,
    putText: putText,
    post: post,
    postMedia : postMedia,
    remove: remove,
    
};

export default API;