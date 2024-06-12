import React from 'react';
import DOMPurify from 'dompurify';

const HtmlRenderer = ({ htmlString }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
  );
};

export default HtmlRenderer;
