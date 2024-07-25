// app/lib/pinecone.ts
import { PineconeClient } from 'pinecone-client';

const pinecone = new PineconeClient();
pinecone.init({
  environment: 'your_environment',
  apiKey: 'your_api_key',
});

export default pinecone;
