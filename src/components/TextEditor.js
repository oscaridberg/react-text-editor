import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef } from 'react';
import config from '../config/config.json';
import docsModel from '../models/docs';
import { useState } from 'react';



export default function TextEditor() {
    const [docs, setDocs] = useState([]);
    const [currentDoc, setCurrentDoc] = useState([]);

    const editorRef = useRef(null);
    
    const log = () => {
      if (editorRef.current) {
        const title = document.getElementById('documentTitle').value;
        const content = editorRef.current.getContent();
        const request = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ title: title, content: content })
        };

        fetch(`${config.base_url}/documents`, request)
          .then(response => response.json());
      }
    };

    useEffect(() => {
      (async () => {
          const allDocs = await docsModel.getAllDocs();
          setDocs(allDocs);
      })();
    }, []);


    // useEffect((event) => {
    //   (async () => {
    //       const title = event.target.value;

    //       const currentDoc = await docsModel.getOneDoc(title);

    //       setCurrentDoc(currentDoc);
    //       editorRef.current.setContent(currentDoc.content);

    //   })();
    // }, []);

    async function fetchDoc(event) {
        const title = event.target.value;
        const currentDoc = await docsModel.getOneDoc(title);
        setCurrentDoc(currentDoc);
    };

 

    return (
      <div className="editorContainer">
        <h1 className='appTitle'>React Text Editor</h1>
        <div className='toolBar'>
          <button className='saveButton' onClick={log}>Save</button>
          <select
          class='docDropDown'
          onChange={fetchDoc}
          >
          <option id='docChoice' value="-99" key="0">Choose a document</option>
          {docs.map((doc, index) => <option value={doc.title} key={index}>{doc.title}</option>)}
          </select>
        </div>

      <form className='documentTitle'>
        <label for="documentTitle">Document Title</label>
        <input type="text" id="documentTitle" className='titleField' defaultValue={currentDoc.title}></input>
      </form>

        <div className='textEditor'>
          <Editor
            apiKey={config.api_key}
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={currentDoc.content}
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

