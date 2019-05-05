import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://yt-clone-e7862.firebaseio.com/'
});

export default instance;