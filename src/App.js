import './style/App.css';
import './style/TextEditor.css'
import React, { useEffect } from 'react';
import TextEditor from './components/TextEditor.js';
import { useState } from 'react';
import { io } from "socket.io-client";
import config from './config/config.json';


let socket;
const SERVER_URL = config.base_url;
function App() {
  const [docs, setDocs] = useState([]);
  const [currentDoc, setCurrentDoc] = useState([]);

  console.log('test');
  useEffect(() => {
    // console.log(currentDoc.content);
    
  })

  useEffect(() => {
    socket = io(SERVER_URL);
    socket.emit("create", currentDoc["_id"]);
    console.log(currentDoc.content);

    let data = {
      _id: currentDoc['_id'],
      title: currentDoc['title'],
      html: currentDoc['content']
    };
    
    socket.emit("doc", data);

    socket.on("doc", (data) => {
      console.log(data.html);
      if (currentDoc['content'] != data.html) {
        setCurrentDoc({
          _id: currentDoc._id,
          title: currentDoc.title, 
          content: data.html
        })
      }
  });

    return () => {
      socket.disconnect();
    }
  }, [currentDoc]);

  return (
    <div className="App">
      <TextEditor currentDoc={currentDoc} setCurrentDoc={setCurrentDoc} docs={docs} setDocs={setDocs} />
    </div>
  );
}

export default App;