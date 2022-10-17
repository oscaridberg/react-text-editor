import config from '../config/config.json';


const docs = {
    // getAllDocs: async function getAllDocs (token, user) {
    //     const response = await fetch(`${config.base_url}/documents`, {
    //         headers: {
    //             "x-access-token": token,
    //         },
    //     });
    //     const result = await response.json();
    //     console.log(result);
    //     const filteredRes = await docs.filterDocs(result, user);
    //     return filteredRes;
    // },

    getAllDocs: async function getAllDocs (user) {
        const response = await fetch(`${config.base_url}/graphql`, {
            method: 'POST',
            body: JSON.stringify({ query: "{ documents { title content authUser} }" }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'aaplication/json'
            },
        })

        const result = await response.json();
        console.log(user);
        const filteredRes = await docs.filterDocs(result.data.documents, user);
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
        // console.log(user);
        // console.log(docs[0].authUser === user.email);
        const filteredDocs = docs.filter(doc => doc.authUser === user.email);
        return filteredDocs
    }
}

export default docs;