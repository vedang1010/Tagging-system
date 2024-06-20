import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Text_Editor({ getDescription }) {
  const [editorValue, setEditorValue] = useState('');

  return (
    <div>
      <ReactQuill
        className='text-black'
        placeholder='Write your text here...'
        value={editorValue}
        onChange={(value) => {
          setEditorValue(value);
          getDescription(value);
        }}
      />
    </div>
  );
}

export default Text_Editor;
