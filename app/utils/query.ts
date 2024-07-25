// query.ts
import { Pinecone, RecordValues } from '@pinecone-database/pinecone';
import { Client } from 'pg';


const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || '', 
 
})
const queryDocuments = async (query: RecordValues) => {
  const index = pinecone.Index('your_index_name');
  const pineconeResults = await index.query({
    topK: 5,
    vector: query,
    includeValues: true,
  });

  const documentIds = pineconeResults.matches.map(match => match.id);

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  const res = await client.query(
    'SELECT * FROM documents WHERE id = ANY($1)',
    [documentIds]
  );

  await client.end();
  return res.rows;
};

export { queryDocuments };
