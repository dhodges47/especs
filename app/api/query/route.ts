// app/api/query/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { execute } from '../../lib/openai';

export async function queryDocuments(req: NextRequest) {
  const { query } = await req.json();
  const result = await execute(query);
  return NextResponse.json(result);
}
