// app/lib/pinecone.ts
import { Pinecone } from '@pinecone-database/pinecone';
const PINECONE_API_ID: string = process.env.PINECONE_API_ID || ''
const pinecone = new Pinecone({
  apiKey: PINECONE_API_ID
});


export default pinecone;


