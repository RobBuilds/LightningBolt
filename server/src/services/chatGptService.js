const puppeteer = require("puppeteer");
const db = require('./databaseService');

const chatGptService = {
    async analyzeContent(content, ChatGPTAPIBrowser) {
        if (!ChatGPTAPIBrowser) {
            throw new Error('ChatGPTAPIBrowser is not defined. Make sure the module is loaded.');
        }
        
        const api = new ChatGPTAPIBrowser({
            email: process.env.CHATGPT_EMAIL,
            password: process.env.CHATGPT_PASSWORD,
        });
        
        await api.initSession();

        try {
            // Send the content to the ChatGPT API and wait for the response
            const analysisResult = await api.analyze(content);

            // Once you have the result, save it to the database before returning
            return await this.saveAnalysisResults(analysisResult);
        } catch (error) {
            // Handle any errors that may occur during the analysis
            console.error('Error during content analysis:', error);
            throw error; // rethrow the error after logging, or handle it as needed
        }
    },

    async saveAnalysisResults(results) {
        const queryText = 'INSERT INTO analysis_results(data) VALUES($1) RETURNING *';
        const params = [JSON.stringify(results)]; // Make sure to stringify your results if it's an object
        try {
            return await db.query(queryText, params);
        } catch (error) {
            // Handle any errors that may occur during saving the results
            console.error('Error saving analysis results:', error);
            throw error; // rethrow the error after logging, or handle it as needed
        }
    },

    async analysisResults() {
        const queryText = 'SELECT * FROM analysis_results';
        try {
            return await db.query(queryText);
        } catch (error) {
            // Handle any errors that may occur during fetching the results
            console.error('Error fetching analysis results:', error);
            throw error; // rethrow the error after logging, or handle it as needed
        }
    },
};

module.exports = chatGptService;
