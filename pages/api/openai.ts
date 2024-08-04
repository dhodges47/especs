'use server'
import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_GPT_MODEL;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});


export async function newChatThread() {
  return "not implemented";
}
export async function init() {
  const { assistantId, threadId } = await setupAssistant();
  return ({
    message: 'assistant Created',
    assistantID: assistantId,
    threadID: threadId
  });
}
export async function setupAssistant() {
  const myAssistant = await openai.beta.assistants.create({

    instructions:
      `
  You are a helpful friend. Your name is Friend. You are having a 
  conversation with a user. You will speak in a concise, 
  highly conversational manner. You will adopt any persona that the 
  user may ask of you.
  `,
    name: "Helpful Friend",
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4-1106-preview",

  });
  const myThread = await openai.beta.threads.create();

  const assistantId = myAssistant.id;
  const threadId = myThread.id;
  return { assistantId, threadId };
}
export async function chatAssistant(threadId: string, assistantId: string, prompt: string) {
    await openai.beta.threads.messages.create(
    threadId,
    { role: "user", content: prompt }
  );
  let run = await openai.beta.threads.runs.create(
    threadId,
    { assistant_id: assistantId }
  );
  while (run.status === "in_progress" || run.status === "queued") {
    // Wait for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('waiting');
    run = await openai.beta.threads.runs.retrieve(
      threadId,
      run.id
    );

    if (run.status === "completed") {
      console.log('Response received');
      const messageDict = await openai.beta.threads.messages.list(
        threadId
      );
      const mostRecentMessage = messageDict['data'][0];
      const assistantMessage = mostRecentMessage['content'][0]['text']['value'];
      return assistantMessage;
    }
  }
}
export async function chatOpenAI(prompt: string) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: OPENAI_MODEL,
    });

    console.log(chatCompletion);
    console.log(chatCompletion.choices[0].message);
    return ({ message: chatCompletion.choices[0].message })
  } catch (error) {
    return ("Error calling the OpenAI API:", error.message);
  }
}