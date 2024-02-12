/*
// ----------------------------- SERVER API ---------------------------------
//  Description: Main server file for the backend API
//  This is the main server file for the backend API. It initializes the
//  Express.js application, sets up middleware, and defines routes for the
//  API endpoints. It also starts the server and listens on the specified
//  port. The server is responsible for processing requests, calling the
//  necessary services, and sending back the appropriate responses.
// --------------------------------------------------------------------------
*/

// Import necessary modules
const express = require('express');
const cors = require('cors');
const puppeteer = require("puppeteer");
const dotenv = require('dotenv');
const fs = require('fs');
const pgp = require('pg-promise')();
const stream = require('stream');
dotenv.config();

// Import services
const chatGptService = require('./services/chatGptService');

// Import routes - ensure these are adapted to your setup
const chatGptRoutes = require('./routes/chatGptRoutes');
const spiderFootRoutes = require('./routes/spiderFootRoutes');

// Initialize database
const db = pgp(process.env.DATABASE_URL);

// Function to start the server
function startServer() {
    const app = express();
    const PORT = process.env.PORT || 4000;
    const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);

    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: '50mb'}));
    app.use(express.json());
    app.use(cors());


    // Mount routes
    app.use('/chatGpt', chatGptRoutes);
    app.use('/spiderFoot', spiderFootRoutes);

    // Routes
    app.get("/", (req, res) => {
        res.send("Welcome to the server!");
    });

    app.get("/api", (req, res) => {
        res.send({ message: "API is up and running!" });
    });

    // Routes
    app.get("/api/csv_scan", (req, res) => {
        res.send("Upload is workin properly!");
    });

    app.get("/api/analysis_results", (req, res) => {
        res.send("Analysis results are working properly!");
    });

    app.post("/api/url", async (req, res) => {
        const { url } = req.body;

        if (!url) {
            return res.status(400).send({ message: 'URL is required' });
        }

        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlRegex.test(url)) {
            return res.status(400).send({ message: 'Invalid URL' });
        }

        const browser = await puppeteer.launch({
            executablePath: process.env.PUPPETEER_EXEC_PATH || '/usr/bin/google-chrome',
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-sandbox',
            ],
        });
        const page = await browser.newPage();
        await page.goto(url);

        const websiteContent = await page.evaluate(() => document.documentElement.innerText.trim());
        const websiteOgImage = await page.evaluate(() => {
            const metaOgImage = document.querySelector('meta[property="og:image"]');
            return metaOgImage ? metaOgImage.content : null;
        });

        try {
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
            await browser.close();
        }
    });

    app.post('/api/csv_scan', async (req, res) => {
        const csvData = req.body.csvData; // Extract CSV data from the request body

        try {
            // Insert CSV data into the database table using Knex
            await knex('csv_scan').insert(csvData);

            res.status(200).json({ message: 'CSV data inserted successfully' });
        } catch (error) {
            console.error('Error inserting CSV data:', error);
            res.status(500).json({ error: 'Failed to insert CSV data into the database' });
        }
    });

    app.post('/api/analysis_results', async (req, res) => {
        try {
            const data = req.body;
            await knex('analysis_results').insert(data);
            res.status(201).json({ message: 'Data inserted' });
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.get('/api/analysis_results', async (req, res) => {
        try {
            const data = await knex('analysis_results').select('*');
            res.json(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.put('/api/analysis_results/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body;
            await knex('analysis_results').where({ id }).update(newData);
            res.json({ message: 'Data updated' });
        } catch (error) {
            console.error('Error updating data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.delete('/api/analysis_results/:id', async (req, res) => {
        try {
            const id = req.params.id;
            await knex('analysis_results').where({ id }).del();
            res.json({ message: 'Data deleted' });
        } catch (error) {
            console.error('Error deleting data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        process.on('SIGINT', () => {
            db.$pool.end();
            console.log('Database connection closed');
            process.exit();
        });
    });
}

startServer();