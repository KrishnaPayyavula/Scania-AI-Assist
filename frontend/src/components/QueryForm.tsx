import React, { useState, FormEvent } from 'react';
import { ModelType } from '../types';

interface QueryFormProps {
  onSubmit: (query: string, model: ModelType) => void;
  isLoading: boolean;
}

const QueryForm: React.FC<QueryFormProps> = ({ onSubmit, isLoading }) => {
  const [query, setQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<ModelType>('gpt-4-mini');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query, selectedModel);
    }
  };

  return (
    <div className="query-form glass-morphism">
      <form onSubmit={handleSubmit}>
        <div className="model-selector">
          <label htmlFor="model">Select AI Model:</label>
          <select
            id="model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as ModelType)}
            className="model-select"
            disabled={isLoading}
          >
            <option value="gpt-4-mini">GPT-4 Mini</option>
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
          </select>
        </div>
        
        <div className="form-group">
          <textarea
            className="form-control modern-input"
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
          className="btn gradient-btn"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? (
            <span className="loading-spinner">
              <span className="spinner"></span>
              Processing...
            </span>
          ) : (
            'Get Answer'
          )}
        </button>
      </form>
    </div>
  );
};

export default QueryForm;