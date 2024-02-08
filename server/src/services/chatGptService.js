const { ChatGPTAPI } = require('chatgpt'); 
const puppeteer = require("puppeteer");
const db = require('./databaseService');

const chatGptService = {
    async analyzeContent(content, useBrowser = false) {
        let analysisResult;

        if (useBrowser) {
            // Initialize and use the browser-based ChatGPT API
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            const ChatGPTAPIBrowser = await import('chatgpt').then(module => module.ChatGPTAPIBrowser);

            const api = new ChatGPTAPIBrowser({
                email: process.env.CHATGPT_EMAIL,
                password: process.env.CHATGPT_PASSWORD,
            });

            await api.initSession(page);

            try {
                analysisResult = await api.analyze(content);
            } catch (error) {
                console.error('Error during content analysis with browser:', error);
                throw error;
            } finally {
                await browser.close();
            }
        } else {
            // Use the direct ChatGPT API
            const api = new ChatGPTAPI({
                apiKey: process.env.OPENAI_API_KEY
            });

            try {
                const res = await api.sendMessage(content);
                analysisResult = res.text; // Assuming res.text contains the API response
            } catch (error) {
                console.error('Error during content analysis with API:', error);
                throw error;
            }
        }

        // Once you have the result, save it to the database before returning
        return await this.saveAnalysisResults(analysisResult);
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
