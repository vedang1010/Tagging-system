// utils/sanitizeInput.js
import DOMPurify from 'dompurify';

const sanitizeInput = (input) => {
  // First, sanitize the HTML to remove any malicious HTML tags like <script>
  const sanitizedHtml = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['ol', 'li', 'p', 'br', 'em', 'strong'],
    ALLOWED_ATTR: []
  });

  // Then, remove potential SQL injection patterns
  const sanitizedInput = sanitizedHtml.replace(/SELECT \*|DROP TABLE|INSERT INTO|UPDATE|DELETE FROM/gi, '');
  
  return sanitizedInput;
};

export default sanitizeInput;
