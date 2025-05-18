import React, { useState } from 'react';
import QueryForm from './components/QueryForm';
import ResponseArea from './components/ResponseArea';
import QueryHistory from './components/QueryHistory';
import { submitQuery } from './services/api';
import { ModelType } from './types/query';
import './App.css';

const App: React.FC = () => {
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const handleSubmit = async (query: string, model: ModelType) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await submitQuery(query, model);
      setResponse(data.response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setResponse('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* <header className="app-header">
        <h1>Scania AI Developer Assistant</h1>
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${!showHistory ? 'active' : ''}`}
            onClick={() => setShowHistory(false)}
          >
            Ask Question
          </button>
          <button 
            className={`toggle-btn ${showHistory ? 'active' : ''}`}
            onClick={() => setShowHistory(true)}
          >
            View History
          </button>
        </div>
      </header> */}

      <header className="app-header">
  <div className="header-content">
    <img 
      src="/assets/scania-logo.png" 
      alt="Scania Logo" 
      className="scania-logo"
    />
    <h1>Scania AI Developer Assistant</h1>
  </div>
  <div className="view-toggle">
    <button 
      className={`toggle-btn ${!showHistory ? 'active' : ''}`}
      onClick={() => setShowHistory(false)}
    >
      Ask Question
    </button>
    <button 
      className={`toggle-btn ${showHistory ? 'active' : ''}`}
      onClick={() => setShowHistory(true)}
    >
      View History
    </button>
  </div>
</header>
      
      <main className="app-main">
        {showHistory ? (
          <QueryHistory />
        ) : (
          <>
            <QueryForm onSubmit={handleSubmit} isLoading={isLoading} />
            <ResponseArea response={response} error={error} isLoading={isLoading} />
          </>
        )}
      </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Scania AI Developer Assistant</p>
      </footer>
    </div>
  );
};export default App;