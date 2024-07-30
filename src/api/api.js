import axios from "axios";

const API_BASE_URL = 'http://127.0.0.1:8000/users/';

async function signup (name, email, password) {
    try {
        const response = await axios.post(`${API_BASE_URL}/sign-up`, {
            name,
            email, 
            password
        });
        //token
        return response.data;
    } catch (error) {
        console.error('Error message:', error);
        return error.response.data || {};
    }
}

async function signin (name, email, password) {
 try {
 const response = await axios.post(`${API_BASE_URL}/sign-in`, {
    name,
    email, 
    password
});
//token
return response.data;
 } catch (error) {
    console.error('Error message:', error);
    return error.response.data || {};
 }
}
