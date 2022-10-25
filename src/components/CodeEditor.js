import React from "react";
import ReactDOM from "react-dom";
import { useState, useRef } from 'react';
import ToolBar from './ToolBar';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';

import Editor from "@monaco-editor/react";

export default function CodeEditor({valueGetter, isEditorReady, setIsEditorReady, editorRef, code, setCode, currentDoc, setCurrentDoc, docs, fetchDoc, saveDoc, setPopup}) {


    function handleEditorDidMount(_valueGetter) {
        setIsEditorReady(true);
        valueGetter.current = _valueGetter;
    }

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


    </div>
   
  );
}