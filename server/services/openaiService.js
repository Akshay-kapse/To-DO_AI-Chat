// import OpenAI from 'openai';
// import { config } from '../config/env.js';

// class OpenAIService {
//   constructor() {
//     console.log('🤖 Initializing OpenAI service...');

//     if (!config.openai.apiKey) {
//       console.error('❌ OpenAI API key not found! AI chat will not work.');
//       console.error('📝 Please add OPENAI_API_KEY to server/.env.local');
//       this.client = null;
//       return;
//     }

//     this.client = new OpenAI({
//       apiKey: config.openai.apiKey,
//     });

//     console.log('✅ OpenAI client initialized');
//   }

//   async sendMessage(message, context = '') {
//     if (!this.client) {
//       console.error('❌ OpenAI client not initialized - missing API key');
//       throw new Error('OpenAI service not configured. Please add your API key to the server environment.');
//     }

//     console.log('📤 OpenAI Service: Sending message:', { message, context });

//     try {
//       const systemPrompt = `You are a helpful productivity assistant for a task management app called "Smart Task Assistant".
//       ${context ? `Current tasks context: ${context}` : ''}

//       Provide helpful, concise responses about productivity, task management, and organization.
//       Keep responses under 150 words and be encouraging and practical.`;

//       console.log('🎯 Calling OpenAI API with model: openroute');

//       const completion = await this.client.chat.completions.create({
//         model: 'openroute.ai',
//         messages: [
//           { role: 'system', content: systemPrompt },
//           { role: 'user', content: message }
//         ],
//         max_tokens: 200,
//         temperature: 0.7,
//       });

//       console.log('📥 OPENROUTEAI API Response:', {
//         choices: completion.choices?.length,
//         usage: completion.usage,
//         model: completion.model,
//         finishReason: completion.choices[0]?.finish_reason
//       });

//       return {
//         message: completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.',
//         usage: completion.usage,
//       };
//     } catch (error) {
//       console.error('❌ OpenAI API Error:', {
//         message: error.message,
//         status: error.status,
//         code: error.code,
//         type: error.type,
//         response: error.response?.data
//       });

//       if (error.status === 401) {
//         console.error('🔑 Invalid API key detected');
//         throw new Error('Invalid OpenAI API key. Please check your configuration.');
//       } else if (error.status === 429) {
//         console.error('⏰ Rate limit exceeded');
//         throw new Error('Rate limit exceeded. Please try again in a moment.');
//       } else if (error.status === 400) {
//         console.error('📝 Bad request - check message format');
//         throw new Error('Invalid request format. Please try a different message.');
//       } else if (error.status === 500) {
//         console.error('🔧 OpenAI service error');
//         throw new Error('OpenAI service is temporarily unavailable. Please try again later.');
//       }

//       console.error('🚨 Unexpected error:', error);
//       throw new Error('Failed to get AI response. Please try again.');
//     }
//   }

//   async getTaskSuggestions(tasks) {
//     if (!this.client) {
//       console.error('❌ OpenAI client not initialized for task suggestions');
//       return [];
//     }

//     if (!tasks || tasks.length === 0) {
//       return [];
//     }

//     try {
//       const taskList = tasks.join(', ');
//       const response = await this.sendMessage(
//         `Based on these tasks: ${taskList}. Suggest 3 additional related tasks that would help with productivity.`
//       );

//       // Parse suggestions from the response
//       const suggestions = response.message
//         .split('\n')
//         .filter(line => line.trim().length > 0 && (line.includes('-') || line.includes('•')))
//         .map(line => line.replace(/^[-•]\s*/, '').trim())
//         .slice(0, 3);

//       return suggestions;
//     } catch (error) {
//       console.error('Error getting task suggestions:', error);
//       return [];
//     }
//   }
// }

// export const openaiService = new OpenAIService();
import axios from "axios";
import { config } from "../config/env.js";

class OpenAIService {
  constructor() {
    console.log("🤖 Initializing OpenRouter AI service...");

    if (!config.openai.apiKey) {
      console.error("❌ OpenRouter API key not found! AI chat will not work.");
      return;
    }

    this.apiKey = config.openai.apiKey;
    this.apiURL = "https://openrouter.ai/api/v1/chat/completions";
    this.headers = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5173", // or your actual frontend
      "X-Title": "Smart Task Assistant",
    };

    console.log("✅ OpenRouter Axios client initialized");
  }

  async sendMessage(message, context = "") {
    const systemPrompt = `You are a helpful productivity assistant for a task management app called "Smart Task Assistant". 
    ${context ? `Current tasks context: ${context}` : ""}
    Provide helpful, concise responses about productivity, task management, and organization. Keep responses under 150 words and be encouraging and practical.`;

    try {
      const res = await axios.post(
        this.apiURL,
        {
          model: "mistralai/mistral-7b-instruct",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          max_tokens: 200,
          temperature: 0.7,
        },
        {
          headers: this.headers,
        }
      );

      return {
        message:
          res.data.choices[0]?.message?.content ||
          "I could not generate a response.",
        usage: res.data.usage,
      };
    } catch (error) {
      console.error("❌ OpenRouter API Error:", {
        message: error.message,
        response: error.response?.data,
      });
      throw new Error("Failed to get AI response. Please try again.");
    }
  }

  async getTaskSuggestions(tasks) {
    if (!Array.isArray(tasks) || tasks.length === 0) return [];

    try {
      const taskList = tasks.join(", ");
      const response = await this.sendMessage(
        `Based on these tasks: ${taskList}. Suggest 3 additional related tasks that would help with productivity.`
      );

      const suggestions = response.message
        .split("\n")
        .filter(
          (line) => line.trim() && (line.includes("-") || line.includes("•"))
        )
        .map((line) => line.replace(/^[-•]\s*/, "").trim())
        .slice(0, 3);

      return suggestions;
    } catch (error) {
      console.error("Error getting task suggestions:", error);
      return [];
    }
  }
}

export const openaiService = new OpenAIService();
