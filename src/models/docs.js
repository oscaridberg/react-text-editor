import config from '../config/config.json';


const docs = {
    getAllDocs: async function getAllDocs () {
        const response = await fetch(`${config.base_url}/documents`);
        const result = await response.json();
        return result;
    },

    getOneDoc: async function getOneDoc (title) {
        const response = await fetch(`${config.base_url}/documents`);
        const result = await response.json();
        let currentDoc = {};
        result.forEach(function (arrayitem) {
            if (arrayitem.title === title) {
                currentDoc =  arrayitem;
            }
        });
        
        return currentDoc;
    }
}

export default docs;