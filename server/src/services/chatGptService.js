const puppeteer = require("puppeteer");

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

        // ... rest of your function
    },
};

module.exports = chatGptService;

