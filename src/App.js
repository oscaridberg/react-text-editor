import './style/App.css';
import './style/TextEditor.css'
import React from 'react';
import TextEditor from './components/TextEditor.js';
import { useState } from 'react';


function App() {
  const [docs, setDocs] = useState([]);
  const [currentDoc, setCurrentDoc] = useState([]);

  return (
    <div className="App">
      <TextEditor docs={docs} setDocs={setDocs}/>
    </div>
  );
}

export default App;
