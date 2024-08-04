'use client'
import { useState } from 'react';
import axios from 'axios';
import { init, chatOpenAI, newChatThread, setupAssistant, chatAssistant } from '@/pages/api/openai';
import { helloworld} from '@/pages/api/helloworld';

const Home = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleQuery = async () => {
    try {
      const res = await axios.post('/api/query', { query });
      setResult(res.data);
    } catch (error) {
      console.error('Error querying documents:', error);
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleHelloWorld = async () => {
    try {
      let response = await helloworld();
      console.log(response);
      setMessage(response.message);
    } catch (error) {
      console.error('Error fetching Hello World:', error);
      setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-3xl font-bold mb-5 text-gray-900">Query Documents</h1>
          <div className="mb-5">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your query"
            />
          </div>
          <div className="flex space-x-4 mb-5">
            <button
              onClick={handleQuery}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Search
            </button>
            <button 
              onClick={handleHelloWorld}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Get Hello World
            </button>
          </div>
          {result && (
            <div className="mt-5">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">Results</h2>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
          {message && <p className="mt-4 text-gray-700">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;