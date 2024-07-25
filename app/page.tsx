//page.tsx
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleQuery = async () => {
    const res = await axios.post('/api/query', { query });
    setResult(res.data);
  };

  return (
    <div>
      <h1>Query Documents</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleQuery}>Search</button>
      {result && (
        <div>
          <h2>Results</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Home;
