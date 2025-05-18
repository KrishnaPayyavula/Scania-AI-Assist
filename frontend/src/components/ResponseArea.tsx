

import React from 'react';
import { marked } from 'marked';

interface ResponseAreaProps {
  response: string | null;
  isLoading: boolean;
  error: string | null;
}

const ResponseArea: React.FC<ResponseAreaProps> = ({ response, isLoading, error }) => {
  // Configure marked with synchronous parsing
  const renderer = new marked.Renderer();
  marked.setOptions({
    gfm: true,
    breaks: true,
    async: false
  });

  const renderMarkdown = (content: string): { __html: string } => {
    return { __html: marked.parse(content, { async: false }) as string };
  };

  return (
    <div className="response-area glass-morphism">
      <h2 className="response-heading">AI Response</h2>
      
      {error && <div className="error glass-morphism-error">{error}</div>}
      
      {isLoading ? (
        <div className="loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <span>Processing your question...</span>
          </div>
        </div>
      ) : response ? (
        <div 
          className="response-content markdown-body"
          dangerouslySetInnerHTML={renderMarkdown(response)}
        />
      ) : (
        <div className="loading">Ask a question to get started</div>
      )}
    </div>
  );
};

export default ResponseArea;