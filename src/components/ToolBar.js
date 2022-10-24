import React, { useRef } from 'react';

export default function ToolBar({code, setCode, editorRef, currentDoc, setCurrentDoc, docs, fetchDoc, saveDoc, setPopup}) {
    
    const save = () => {
        if (editorRef.current) {
          const title = document.getElementById('documentTitle').value;
          const content = editorRef.current.getContent();
          saveDoc(title, content);
        }
      };
  
      function downloadDoc () {
        const options = editorRef.current.ui.registry.getAll().menuItems
        options.print.onAction();
  
  
  
        // const Naomi = "Hi Naomi you're really cute"
        // console.log(Naomi)
        // const oscar="dundermifflinpaperco"
      };
  
      function displayPopup () {
        setPopup(true);
      };
  
      function toggleCodemode () {
        const toggle = !code;
        setCode(toggle)
      }

    return (
        <div className='toolBar'>
          <button className='saveButton' onClick={save}>Save</button>
          <button className='printButton' onClick={downloadDoc}>Print</button>
          <button className='printButton' onClick={displayPopup}>Invite</button>
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
          <p>Code mode</p>
          <label class="switch">
            <input type="checkbox" onClick={toggleCodemode} />
            <span class="slider round"></span>
          </label>
        </div>
    );
}