import ingestPdf from '../../app/utils/ingestPdf';

export async function ingest(filePath: string) {
   
    const result = await ingestPdf(filePath);
    return result;
  }
  