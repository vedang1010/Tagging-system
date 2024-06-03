import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Text_Editor() {
    const [editorValue, setEditorValue] = useState('');

    return (
      <ReactQuill
        value={editorValue}
        onChange={(value) => {
            setEditorValue(value);}
        }
      />
    );
}

export default Text_Editor