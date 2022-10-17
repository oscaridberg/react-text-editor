import './style/App.css';
import './style/TextEditor.css'
import React, { useEffect } from 'react';
import TextEditor from './components/TextEditor.js';
import Login from './components/Login.js';
import { useState } from 'react';
import { io } from "socket.io-client";
import config from './config/config.json';
import authModel from './models/auth';
import docsModel from './models/docs';


let socket;
const SERVER_URL = config.base_url;
// "base_url": "https://jsramverk-editor-osid15.azurewebsites.net/"



function App() {
  const [docs, setDocs] = useState([]);
  const [currentDoc, setCurrentDoc] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});


  async function getAllDocs() {
    const allDocs = await docsModel.getAllDocs(user);
    setDocs(await allDocs);
  };

  async function fetchDoc(event) {
    const title = event.target.value;
    const doc = await docsModel.getOneDoc(title, token);
    setCurrentDoc(doc);
  };

  async function saveDoc(title, content) {
    await docsModel.saveDoc(title, content, token, user);
  }

  useEffect(() => {
    (async () => {
      await getAllDocs();
    })();
  }, [token]);

  useEffect(() => {
    socket = io(SERVER_URL);
    socket.emit("create", currentDoc["_id"]);
    let data = {
      _id: currentDoc['_id'],
      title: currentDoc['title'],
      html: currentDoc['content'],
      authUser: user.email
    };
    
    socket.emit("doc", data);

    socket.on("doc", (data) => {
      if (currentDoc['content'] !== data.html) {
        setCurrentDoc({
          _id: currentDoc._id,
          title: currentDoc.title, 
          content: data.html,
          authUser: user.email
        })
      }
  });

    return () => {
      socket.disconnect();
    }
  }, [currentDoc]);

  return (
    <div className="App">
      <h1 className='appTitle'>React Text Editor</h1>
      {token ? 
      <>
       <TextEditor currentDoc={currentDoc} setCurrentDoc={setCurrentDoc} docs={docs} fetchDoc={fetchDoc} saveDoc={saveDoc}/>
      </>
      :
      <Login setToken={setToken} user={user} setUser={setUser} />}
    </div>
  );
}

export default App;