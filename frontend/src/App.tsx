import React, { useState } from 'react';
import QueryForm from './components/QueryForm';
import ResponseArea from './components/ResponseArea';
import { submitQuery } from './services/api';

const App: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await submitQuery({ query });
      setResponse(result.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Scania AI Assistant</h1>
        <p>Get quick answers to your developer questions</p>
      </div>
      
      <QueryForm onSubmit={handleSubmit} isLoading={isLoading} />
      <ResponseArea response={response} isLoading={isLoading} error={error} />
    </div>
  );
};

export default App;