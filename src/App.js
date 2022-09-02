import './style/App.css';
import './style/TextEditor.css'
import React, { useRef } from 'react';
import TextEditor from './components/TextEditor.js';


function App() {
  return (
    <div className="App">
      <TextEditor/>
    </div>
  );
}

export default App;
