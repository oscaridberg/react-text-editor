import config from '../config/config.json';
const baseUrl = config.base_url;


const email = {
    sendEmail: async function sendEmail(user) {
        const email = {email: user}

        const response = await fetch(`${baseUrl}/email`, {
            body: JSON.stringify(email),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });

        const result = await response.json();

        return result;
    }
}

export default email;