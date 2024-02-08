const puppeteer = require("puppeteer");
const db = require('./databaseService');

// Dynamically import the ChatGPT API
let ChatGPTAPI, ChatGPTAPIBrowser;

import('chatgpt')
  .then(module => {
      ChatGPTAPI = module.ChatGPTAPI; // Direct API
      ChatGPTAPIBrowser = module.ChatGPTAPIBrowser; // Browser-based API, assuming it's exported by the same module
  })
  .catch(err => {
      console.error('Failed to load the chatgpt module:', err);
  });

const chatGptService = {
    async analyzeContent(content, useBrowser = false) {
        if (useBrowser) {
            // Ensure the ChatGPTAPIBrowser is loaded
            if (!ChatGPTAPIBrowser) {
                throw new Error('ChatGPTAPIBrowser module not loaded.');
            }

            // Initialize and use the browser-based ChatGPT API
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            const api = new ChatGPTAPIBrowser({
                email: process.env.CHATGPT_EMAIL,
                password: process.env.CHATGPT_PASSWORD,
            });

            await api.initSession(page);

            let analysisResult;
            try {
                analysisResult = await api.analyze(content);
            } catch (error) {
                console.error('Error during content analysis with browser:', error);
                throw error;
            } finally {
                await browser.close();
            }

            // Once you have the result, save it to the database before returning
            return await this.saveAnalysisResults(analysisResult);
        } else {
            // Ensure the ChatGPTAPI is loaded
            if (!ChatGPTAPI) {
                throw new Error('ChatGPTAPI module not loaded.');
            }

            // Use the direct ChatGPT API
            const api = new ChatGPTAPI({
                apiKey: process.env.OPENAI_API_KEY
            });

            let analysisResult;
            try {
                const res = await api.sendMessage(content);
                analysisResult = res.text; // Assuming res.text contains the API response
            } catch (error) {
                console.error('Error during content analysis with API:', error);
                throw error;
            }

            // Once you have the result, save it to the database before returning
            return await this.saveAnalysisResults(analysisResult);
        }
    },

    async saveAnalysisResults(results) {
        const queryText = 'INSERT INTO analysis_results(data) VALUES($1) RETURNING *';
        const params = [JSON.stringify(results)]; // Ensure results are properly stringified
        try {
            return await db.query(queryText, params);
        } catch (error) {
            console.error('Error saving analysis results:', error);
            throw error;
        }
    },

    async fetchAnalysisResults() {
        const queryText = 'SELECT * FROM analysis_results';
        try {
            return await db.query(queryText);
        } catch (error) {
            console.error('Error fetching analysis results:', error);
            throw error;
        }
    },
};

module.exports = chatGptService;
