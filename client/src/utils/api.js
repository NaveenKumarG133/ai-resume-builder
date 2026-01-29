import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:5050/api',
});

export const fetchResumes = (userId) => API.get(`/resumes?userId=${userId}`);
export const createResume = (data) => API.post('/resumes', data);
export const aiRewrite = (content, field) => API.post('/resumes/ai/rewrite', { content, field });

export default API;
