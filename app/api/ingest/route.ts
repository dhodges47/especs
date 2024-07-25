// app/api/ingest/route.ts
import { NextRequest, NextResponse } from 'next/server';
import ingestPdf from '../../../utils/ingestPdf';

export async function POST(req: NextRequest) {
  const { filePath } = await req.json();
  const result = await ingestPdf(filePath);
  return NextResponse.json(result);
}
