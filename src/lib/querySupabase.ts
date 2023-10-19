import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { supabase } from './supabase';

export const query = async (question: string, n: number = 2) => {
  const client = supabase;
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    batchSize: 512,
  });
  const store = new SupabaseVectorStore(embeddings, {
    client,
    tableName: 'documents',
  });
  return await store.similaritySearch(question, n);
};
