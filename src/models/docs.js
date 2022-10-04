import config from '../config/config.json';


const docs = {
    getAllDocs: async function getAllDocs (token, user) {
        const response = await fetch(`${config.base_url}/documents`, {
            headers: {
                "x-access-token": token,
            },
        });
        const result = await response.json();
        const filteredRes = await docs.filterDocs(result, user);
        return filteredRes;
    },

    getOneDoc: async function getOneDoc (title, token) {
        const response = await fetch(`${config.base_url}/documents`, {
            headers: {
                "x-access-token": token,
            }
        });
        const result = await response.json();
        let currentDoc = {};
        result.forEach(function (arrayitem) {
            if (arrayitem.title === title) {
                currentDoc =  arrayitem;
            }
        });
        
        return currentDoc;
    },

    saveDoc: async function saveDoc(title, content, token, user) {
        console.log(user);
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                title: title, 
                content: content,
                user: user.email
            })
        };

        fetch(`${config.base_url}/documents`, request)
            .then(response => response.json());
    },

    filterDocs: async function filterDocs(docs, user) {
        const filteredDocs = docs.filter(doc => doc.authUser === user.email);

        return filteredDocs
    }
}

export default docs;