import Axios from '../utils/Axios';


export const login = (data) => Axios.post('/auth/signIn', data);
