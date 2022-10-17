import config from '../config/config.json';

const baseUrl = config.base_url;


const auth = {
    token: "",
    login: async function login(user) {
        const response = await fetch(`${baseUrl}/auth/login`, {
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });

        const result = await response.json();
        return result;
    },

    register: async function register(user) {
        const response = await fetch(`${baseUrl}/auth/register`, {
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });

        const result = await response.json();

        return result;
    }
};

export default auth;