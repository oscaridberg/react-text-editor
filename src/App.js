import './style/App.css';
import './style/TextEditor.css'
import React, { useEffect } from 'react';
import TextEditor from './components/TextEditor.js';
import { useState } from 'react';
import { io } from "socket.io-client";
import config from './config/config.json';


let socket;
const SERVER_URL = "ws://localhost:1337";

function App() {
  const [docs, setDocs] = useState([]);
  const [currentDoc, setCurrentDoc] = useState([]);

  useEffect(() => {
    // console.log(currentDoc.content);
    
  })

  useEffect(() => {
    socket = io(SERVER_URL);
    socket.emit("create", currentDoc["_id"]);
    // console.log(currentDoc.content);

    let data = {
      _id: currentDoc['_id'],
      title: currentDoc['title'],
      html: currentDoc['content']
    };
    
    socket.emit("doc", data);

    socket.on("doc", (data) => {
      // console.log(data.html);
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

// function handleChange(html, text) {
//   if (updateCurrentDocOnChange) {
//       const copy = Object.assign({}, currentDoc);

//       copy.html = html;

//       setCurrentDoc(copy);
//   }

//   updateCurrentDocOnChange = true;
// }

// function setEditorContent(content, triggerChange) {
//     let element = document.querySelector("trix-editor");

//     updateCurrentDocOnChange = triggerChange;
//     element.value = "";
//     element.editor.setSelectedRange([0, 0]);
//     updateCurrentDocOnChange = triggerChange;
//     element.editor.insertHTML(content);
// }
