import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import config from '../config/config.json';
// import ToolBar from './ToolBar';
import { useState } from 'react';


export default function TextEditor() {
    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };


    return (
      <div className="editorContainer">
        <div className='toolBar'>
          <button className='saveButton' onClick={log}>Save</button>
        </div>
        <Editor
          className='textEditor'
          apiKey={config.api_key}
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor.</p>"
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
    );
  }