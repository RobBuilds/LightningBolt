// const express = require('express');
// const cors = require('cors');
// const { createRequire } = require("module"); // Adjusted for CommonJS
// const puppeteer = require("puppeteer");
// const dotenv = require('dotenv'); // Adjusted for CommonJS
// dotenv.config();

// // Import routes
// const chatGptRoutes = require('./chatGptRoutes');
// const spiderFootRoutes = require('./spiderFootRoutes');

// const app = express();
// const PORT = process.env.PORT || 4000; // Use environment variable or default

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// // ChatGPT and SpiderFoot routes
// app.use('/api/chatgpt', chatGptRoutes);
// app.use('/api/spiderfoot', spiderFootRoutes);

// // Simple API check
// app.get("/api", (req, res) => {
// 	res.send({
// 		message: "My API is up and running!",
// 	});
// });

// // Your custom logic
// const database = [];
// const generateID = () => Math.random().toString(36).substring(2, 10);

// async function chatgptFunction(content) {
// 	const { ChatGPTAPIBrowser } = require("chatgpt"); // Moved inside function to match import style
// 	const api = new ChatGPTAPIBrowser({
//         email: process.env.CHATGPT_EMAIL,
//         password: process.env.CHATGPT_PASSWORD,
// 	});
// 	await api.initSession();

// 	const getBrandName = await api.sendMessage(`I have a raw text of a website, what is the brand name in a single word? ${content}`);
// 	const getBrandDescription = await api.sendMessage(`I have a raw text of a website, can you extract the description of the website from the raw text. I need only the description and nothing else. ${content}`);
	
//     return {
// 		brandName: getBrandName.response,
// 		brandDescription: getBrandDescription.response,
// 	};
// }

// app.post("/api/url", async (req, res) => {
// 	const { url } = req.body;

// 	const browser = await puppeteer.launch();
// 	const page = await browser.newPage();
// 	await page.goto(url);

// 	const websiteContent = await page.evaluate(() => document.documentElement.innerText.trim());
// 	const websiteOgImage = await page.evaluate(() => {
// 		const metas = document.getElementsByTagName("meta");
// 		for (let i = 0; i < metas.length; i++) {
// 			if (metas[i].getAttribute("property") === "og:image") {
// 				return metas[i].getAttribute("content");
// 			}
// 		}
// 	});

// 	let result = await chatgptFunction(websiteContent);
// 	result.brandImage = websiteOgImage;
// 	result.id = generateID();
// 	database.push(result);

// 	await browser.close(); // Ensure the browser is closed after operation

// 	res.json({
// 		message: "Request successful!",
// 		database,
// 	});
// });

// // Start server
// app.listen(PORT, () => {
// 	console.log(`Server listening on port ${PORT}`);
// });

// server/src/server.js
const express = require('express');
const cors = require('cors');
const puppeteer = require("puppeteer");
const dotenv = require('dotenv');
dotenv.config();

// Import services
const chatGptService = require('./services/chatGptService');

// Import routes - make sure these are compatible with your setup
const chatGptRoutes = require('./routes/chatGptRoutes');
const spiderFootRoutes = require('./routes/spiderFootRoutes');

// Dynamically import the ES Module
import('chatgpt').then(chatgptModule => {
    const ChatGPTAPIBrowser = chatgptModule.ChatGPTAPIBrowser;
    startServer(ChatGPTAPIBrowser); // Now passing the imported module to the server
}).catch(err => {
    console.error('Failed to import chatgpt module:', err);
});

function startServer(ChatGPTAPIBrowser) {
    const app = express();
    const PORT = process.env.PORT || 4000; // Use environment variable or default

    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());

    // ChatGPT and SpiderFoot routes
    app.use('/api/chatgpt', chatGptRoutes);
    app.use('/api/spiderfoot', spiderFootRoutes);

    // Simple API check
    app.get("/api", (req, res) => {
        res.send({ message: "API is up and running!" });
    });
	
	// Welcome to the server
	app.get("/", (req, res) => {
		res.send("Welcome to the server!");
	});
	
    // Endpoint to analyze the website content
    app.post("/api/url", async (req, res) => {
        const { url } = req.body;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const websiteContent = await page.evaluate(() => document.documentElement.innerText.trim());
        const websiteOgImage = await page.evaluate(() => {
            const metas = document.getElementsByTagName("meta");
            for (let i = 0; i < metas.length; i++) {
                if (metas[i].getAttribute("property") === "og:image") {
                    return metas[i].getAttribute("content");
                }
            }
        });

        try {
            let result = await chatGptService.analyzeContent(websiteContent, ChatGPTAPIBrowser);
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

    // Start server
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

