import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef } from 'react';
import config from '../config/config.json';
import docsModel from '../models/docs';
import { useState } from 'react';
import ToolBar from './ToolBar';


export default function TextEditor({code, setCode, currentDoc, setCurrentDoc, docs, fetchDoc, saveDoc, setPopup}) {
    const editorRef = useRef(null);

    async function handleKeyUp(event) {
        setCurrentDoc({
          _id: currentDoc._id,
          title: currentDoc.title, 
          content: editorRef.current.getContent()
        });
    };

    return (
      <div className="editorContainer">
        <ToolBar code={code} setCode={setCode} editorRef={editorRef} currentDoc={currentDoc} setCurrentDoc={setCurrentDoc} docs={docs} fetchDoc={fetchDoc} saveDoc={saveDoc} setPopup={setPopup} />

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
