// app/lib/openai.ts
import { Configuration, OpenAIApi } from 'openai';
import { functions } from '../utils/openaiFunctions';
import ingestPdf from '../utils/ingestPdf';
import { queryDocuments } from '../utils/query';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const callFunction = async (name: string, args: any) => {
  switch (name) {
    case 'ingestPdf':
      return await ingestPdf(args.filePath);
    case 'queryDocuments':
      return await queryDocuments(args.query);
    default:
      throw new Error(`Unknown function: ${name}`);
  }
};

const execute = async (query: string) => {
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: query }],
    functions: Object.values(functions),
  });

  const { message } = response.data.choices[0];
  if (message.function_call) {
    const { name, arguments: args } = message.function_call;
    const functionResult = await callFunction(name, JSON.parse(args));
    return functionResult;
  }

  return response.data.choices[0].text;
};

export { openai, execute };
