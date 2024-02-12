# LightningBolt
LightningBolt is an advanced open-source intelligence (OSINT) application designed to empower users by efficiently scraping websites and obtaining specific information they are searching for. Built on a modern tech stack, it leverages Node.js, PostgreSQL, Knex.js, Express, Material-UI (MUI), ChatGPT, Puppeteer, React, and incorporates Spiderfoot for comprehensive OSINT capabilities.

## Getting Started
### Prerequisites
Ensure you have the latest version of Node.js and npm (Node package manager) installed to run LightningBolt on your machine.

### Installation
Clone the repository: git clone https://github.com/YourRepository/LightningBolt.git
Navigate to the LightningBolt directory:
cd LightningBolt
Install the required dependencies:
npm install --legacy-peer-deps

### Features
LightningBolt offers a suite of tools for OSINT, tailored to streamline the collection, storage, and analysis of web data:

Keyword Search and Data Scraping: Utilizes Puppeteer to perform targeted searches and scrape data from websites.

Data Storage with PostgreSQL: Scrape data is automatically stored, offering robust query capabilities for data analysis.

Insights with ChatGPT: Analyzes scraped data to generate insights, identify trends, and suggest further investigation areas.

CSV File Upload and Search: Allows users to upload and search within CSV files, enhancing data management and analysis.

Database Logging of CSV Files: Ensures secure storage and easy access of bulk uploaded data.

Email Finder: Finds email addresses using web addresses and names, aiding in contact information gathering.

Real-time Database Information Display: Fetches and displays current database information on the frontend for up-to-date data access.

Advanced OSINT with Spiderfoot: Integrates Spiderfoot for automated intelligence collection from various sources, expanding the application’s scanning and analyzing capabilities.

### Usage
To use LightningBolt, follow these steps:

Configure environment variables in a .env file based on .env.example.
Build and run the application container with Docker:
docker-compose up --build
Access the web interface to input search terms and begin the scraping process.
Contributing
Interested in contributing? Contact the developers via LightningBolt's Contact Page.

### License
Licensed under the MIT License. See LICENSE.md for details.

### Contact
Charles Sanders (@visionthex)
Tyrelle Robinson (@RobBuilds)
Braden Walker (@WalkerB20)
Tommy Daniel (@tdronin)

### Happy Hacking!