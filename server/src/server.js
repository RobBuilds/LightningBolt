const express = require('express');
const cors = require('cors');
const puppeteer = require("puppeteer");
const dotenv = require('dotenv');
dotenv.config();

// Import services
const chatGptService = require('./services/chatGptService');

// Import routes - ensure these are adapted to your setup
const chatGptRoutes = require('./routes/chatGptRoutes');
const spiderFootRoutes = require('./routes/spiderFootRoutes');

async function startServer() {
    const app = express();
    const PORT = process.env.PORT || 4000;
    const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);

    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    // Simple API check and welcome message
    app.get("/api", (req, res) => {
        res.send({ message: "API is up and running!" });
    });

    app.get("/", (req, res) => {
        res.send("Welcome to the server!");
    });

    // Endpoint for processing URL content
    app.post("/api/url", async (req, res) => {
        const { url } = req.body;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const websiteContent = await page.evaluate(() => document.documentElement.innerText.trim());
        const websiteOgImage = await page.evaluate(() => {
            // Extraction logic for 'og:image' content, assuming it's implemented above
        });

        try {
            // Direct call to the service function without passing the now-removed ChatGPTAPIBrowser
            let result = await chatGptService.analyzeContent(websiteContent);
            result.brandImage = websiteOgImage;
            result.id = Math.random().toString(36).substring(2, 10);

            res.json({
                message: "Request successful!",
                result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while analyzing the content.');
        } finally {
            await browser.close(); // Ensure the browser is closed after operation
        }
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

// Execute the server startup function
startServer();

