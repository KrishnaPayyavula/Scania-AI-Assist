import React from 'react';

interface ResponseAreaProps {
  response: string | null;
  isLoading: boolean;
  error: string | null;
}

const ResponseArea: React.FC<ResponseAreaProps> = ({ response, isLoading, error }) => {
  return (
    <div className="response-area">
      <h2 className="response-heading">AI Response</h2>
      
      {error && <div className="error">{error}</div>}
      
      {isLoading ? (
        <div className="loading">Processing your question...</div>
      ) : response ? (
        <div className="response-content">{response}</div>
      ) : (
        <div className="loading">Ask a question to get started</div>
      )}
    </div>
  );
};

export default ResponseArea;