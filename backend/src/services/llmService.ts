
import { AzureOpenAI } from "openai";
import { env } from '../config/env';
import logger from '../utils/logger';

class LLMService {
  private client: AzureOpenAI;

  constructor() {
    this.client = new AzureOpenAI({
      endpoint: env.AZURE_OPENAI_ENDPOINT,
      apiKey: env.AZURE_OPENAI_API_KEY,
      apiVersion: "2025-01-01-preview",
      deployment: env.AZURE_OPENAI_DEPLOYMENT_NAME,
    });
  }

  /**
   * Process a developer query using Azure OpenAI
   * @param query The user's query
   * @returns The LLM response
   */
  async processQuery(query: string): Promise<string> {
    try {
      logger.info(`Processing query: ${query}`);

      const result = await this.client.chat.completions.create({
        model: env.AZURE_OPENAI_DEPLOYMENT_NAME,  // Add the required model parameter
        messages: [
          {
            role: "system",
            content: "You are an AI developer assistant trained to provide helpful, clear, and accurate responses to programming and development questions."
          },
          { role: "user", content: query }
        ],
        max_tokens: 800,
        temperature: 0.7,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: null
      });

      const response = result.choices[0]?.message?.content;
      if (!response) {
        throw new Error("No response from Azure OpenAI.");
      }

      logger.info('Query processed successfully');
      return response;

    } catch (error) {
      logger.error('Error processing query with Azure OpenAI:', error);
      throw new Error('Failed to process your query. Please try again.');
    }
  }
}

export default new LLMService();