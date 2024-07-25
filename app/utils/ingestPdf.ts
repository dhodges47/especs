// ingestPdf.ts
import fs from 'fs';
import pdfParse from 'pdf-parse';
import { Client } from 'pg';

const ingestPdf = async (filePath: string) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  const content = data.text;

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  const res = await client.query(
    'INSERT INTO documents (title, content) VALUES ($1, $2) RETURNING *',
    [filePath, content]
  );

  await client.end();
  return res.rows[0];
};

export default ingestPdf;
