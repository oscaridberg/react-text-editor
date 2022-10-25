import React from "react";
import ReactDOM from "react-dom";
import { useState, useRef } from 'react';
import ToolBar from './ToolBar';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';

import Editor from "@monaco-editor/react";

export default function CodeEditor({valueGetter, isEditorReady, setIsEditorReady, editorRef, code, setCode, currentDoc, setCurrentDoc, docs, fetchDoc, saveDoc, setPopup}) {
    const [terminal, setTerminal] = useState('');


    function handleEditorDidMount(_valueGetter) {
        setIsEditorReady(true);
        valueGetter.current = _valueGetter;
    }

    async function runCode() {
        const code = valueGetter.current.getValue();

        var data = {
            code: btoa(code)
        };

        const response = await fetch("https://execjs.emilfolino.se/code", {
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });

        const result = await response.json();

        let decodedOutput = atob(result.data);

        setTerminal(decodedOutput);
        // return result;
    }

    const changeHandler = (evt, newText) => {
        setCode(newText);
      };

    return (
    <div className="editorContainer">

        <ToolBar valueGetter={valueGetter} isEditorReady={isEditorReady} setIsEditorReady={setIsEditorReady} code={code} setCode={setCode} editorRef={editorRef} currentDoc={currentDoc} setCurrentDoc={setCurrentDoc} docs={docs} fetchDoc={fetchDoc} saveDoc={saveDoc} setPopup={setPopup} />

        <form className='documentTitle'>
        <label htmlFor="documentTitle">Document Title</label>
        <input type="text" id="documentTitle" className='titleField' defaultValue={currentDoc.title}></input>
        </form>

    <div className="textEditor">
    
    <MonacoEditor
        editorDidMount={handleEditorDidMount}
        width="900"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={currentDoc['content']}
        


      />
    </div>

    <div className="terminalContainer">
        <div className="terminalWindow">
            <p className="terminalText">terminal~ {terminal}</p>
        </div>
        <button className='terminalButton' onClick={runCode}>Run code</button>
    </div>    


    </div>
   
  );
}