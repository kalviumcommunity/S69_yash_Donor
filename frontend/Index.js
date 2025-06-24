import 'dotenv/config';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { LLMChain } from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';

const chat = new ChatOpenAI({ temperature: 0.7 });

const prompt = new PromptTemplate({
  inputVariables: ['topic'],
  template: "Write a short and informative blog introduction about {topic}.",
});

const chain = new LLMChain({ llm: chat, prompt });

const response = await chain.call({ topic: "Artificial Intelligence in Education" });

console.log("Generated Blog Intro:");
console.log(response.text);
