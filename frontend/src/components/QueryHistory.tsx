import React, { useEffect, useState } from 'react';
import { getQueryHistory } from '../services/api';
import { QueryResponse } from '../types/query'; // Import the type from your types file

const QueryHistory: React.FC = () => {
  const [history, setHistory] = useState<QueryResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setIsLoading(true);
        const data = await getQueryHistory();
        setHistory(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load history');
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  if (isLoading) {
    return <div className="loading-indicator">Loading history...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (history.length === 0) {
    return <div className="empty-history">No query history available.</div>;
  }

  return (
    <div className="query-history-container">
      <h2>Query History</h2>
      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <div className="history-item-header">
              <span className="history-item-date">
                {new Date(item.timestamp).toLocaleString()}
              </span>
              <span className="history-item-model">Model: {item.model}</span>
            </div>
            <div className="history-item-query">
              <strong>Query:</strong> {item.query}
            </div>
            <div className="history-item-response">
              <strong>Response:</strong>
              <pre>{item.response}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryHistory;
