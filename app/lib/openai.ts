// openai.ts

import OpenAI from 'openai';
const { Configuration, OpenAIApi } = require("openai");
import { functions, tools } from '../utils/openaiFunctions';
import ingestPdf from '../utils/ingestPdf';
import { queryDocuments } from '../api/query/route';


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set in the environment variables
});
const openai = new OpenAIApi(configuration);

// Define the expected return type for the callFunction
interface FunctionResult {
  [key: string]: any; 
}



const callFunction = async (name: string, args: any) : Promise<FunctionResult> =>{
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
    tools: tools,
    tool_choice: "auto",
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
