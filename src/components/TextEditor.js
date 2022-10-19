import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef } from 'react';
import config from '../config/config.json';
import docsModel from '../models/docs';
// import { useState } from 'react';



export default function TextEditor({currentDoc, setCurrentDoc, docs, fetchDoc, saveDoc}) {
    const editorRef = useRef(null);
    
    const save = () => {
      if (editorRef.current) {
        const title = document.getElementById('documentTitle').value;
        const content = editorRef.current.getContent();
        saveDoc(title, content);
      }
    };

    async function handleKeyUp(event) {
        setCurrentDoc({
          _id: currentDoc._id,
          title: currentDoc.title, 
          content: editorRef.current.getContent()
        });
    };

    function downloadDoc () {
      const options = editorRef.current.ui.registry.getAll().menuItems
      options.print.onAction();
    };

    return (
      <div className="editorContainer">
        <div className='toolBar'>
          <button className='saveButton' onClick={save}>Save</button>
          <button className='saveButton' onClick={downloadDoc}>Print</button>
          <select
          className='docDropDown'
          onChange={fetchDoc}
          >
          <option id='docChoice' value="-99" key="0">Choose a document</option>
          {docs.length ?
            <>
            {docs.map((doc, index) => <option value={doc.title} key={index}>{doc.title}</option>)}
            </>
          :
          <option></option>
          }
          </select>
        </div>

      <form className='documentTitle'>
        <label htmlFor="documentTitle">Document Title</label>
        <input type="text" id="documentTitle" className='titleField' defaultValue={currentDoc.title}></input>
      </form>

        <div className='textEditor'>
          <Editor
            apiKey={config.api_key}
            onInit={(evt, editor) => editorRef.current = editor}
            value={currentDoc['content']}
            onKeyUp={handleKeyUp}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </div>
        
      </div>
    );
  }

