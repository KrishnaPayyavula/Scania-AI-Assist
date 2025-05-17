import React, { useState, FormEvent } from 'react';

interface QueryFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const QueryForm: React.FC<QueryFormProps> = ({ onSubmit, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <div className="query-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask your developer question here... (e.g., 'How do I implement a debounce function in JavaScript?')"
            rows={5}
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="btn"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? 'Processing...' : 'Get Answer'}
        </button>
      </form>
    </div>
  );
};

export default QueryForm;