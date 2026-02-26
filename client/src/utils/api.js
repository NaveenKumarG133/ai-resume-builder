import axios from 'axios';

const API = axios.create({
    baseURL: 'https://ai-resume-builder-backend-hzu3.onrender.com/api',
});

export const fetchResumes = (userId) => API.get(`/resumes?userId=${userId}`);
export const createResume = (data) => API.post('/resumes', data);
export const aiRewrite = (content, field) => API.post('/resumes/ai/rewrite', { content, field });

export default API;
