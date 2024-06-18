import React from 'react';
import DOMPurify from 'dompurify';

const HtmlRenderer = ({ htmlString }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
  );
};

export default HtmlRenderer;



// import React, { useState } from 'react';
// import Text_Editor from './Text_Editor';

// function ParentComponent() {
//   const [description, setDescription] = useState('');

//   const handleDescriptionChange = (value) => {
//     setDescription(value);
//   };

//   return (
//     <div>
//       <h1>Text Editor</h1>
//       <Text_Editor getDescription={handleDescriptionChange} />
//       <div>
//         <h2>Output:</h2>
//         <div dangerouslySetInnerHTML={{ __html: description }} />
//       </div>
//     </div>
//   );
// }

// export default ParentComponent;

