import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.withCredentials = true
window.axios.defaults.baseURL ="http://localhost:8000/api"// /cars