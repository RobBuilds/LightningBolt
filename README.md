# LightningBolt

LightningBolt is an open-source intelligence application designed to empower users by scraping websites and obtaining the specific information they are searching for. This tool leverages a modern tech stack including Node.js, PostgreSQL for the database, Knex.js for database queries, Express, MUI (Material-UI) for styling the UI, ChatGPT, Puppeteer for web scraping, and React for application interactivity.

## Getting Started

### Prerequisites

Before you can run LightningBolt on your machine, make sure you have the following installed:

- Node.js (latest version)
- npm (Node package manager)

This project uses several key technologies:

- Express for server-side logic
- MUI (Material-UI) for UI styling
- Puppeteer for web scraping
- React for building the user interface
- Knex.js for making simplified queries to the database
- ChatGPT for AI interaction
- PostgreSQL for database interaction

### Installation

To get LightningBolt up and running, follow these steps:

1. Clone the repository to your local machine:

git clone https://github.com/RobBuilds/LightningBolt.git

2. Navigate to the LightningBolt directory:

cd LightningBolt

3. Install the required dependencies:

npm i --legacy-peer-deps

## Server

1. Install the required dependencies

npm i --legacy-peer-deps

## Features

This application offers a comprehensive suite of tools for open-source intelligence (OSINT) gathering, designed to streamline the process of collecting, storing, and analyzing data from the web. Key features include:

Keyword Search and Data Scraping: Utilize Puppeteer to perform keyword-based searches and scrape relevant data from specified websites. This feature allows for precise information gathering tailored to your intelligence requirements.

Data Storage with PostgreSQL: Automatically store scraped data in a PostgreSQL database. This relational database management system ensures data integrity and provides robust query capabilities for analyzing collected information.

Insights with ChatGPT: Leverage the power of ChatGPT to generate insights from the scraped data. ChatGPT can summarize information, identify trends, and even suggest areas for further investigation, enriching the intelligence gathering process.

Containerization with Docker: The application is containerized using Docker, ensuring consistency across different computing environments and simplifying deployment and scalability. Docker containers encapsulate the application and its dependencies, making it easy to manage and distribute.

Advanced OSINT with Spiderfoot: Integrate with Spiderfoot, an open-source tool for automating the process of gathering intelligence from various sources. Spiderfoot scans and analyzes data from social media, databases, and more, providing a comprehensive view of the digital footprint associated with your search terms.

## Usage

To get started with the application, follow these steps:

Configuration:

Copy the .env.example file to a new file named .env and customize the environment variables according to your setup, including PostgreSQL and Spiderfoot configurations.

Running the Application:
Use Docker to build and run the application container:

docker-compose up --build

This command will start all services, including the web scraper, PostgreSQL database, and ChatGPT integration.

Performing Searches:

Access the application's web interface to enter your search terms and start the scraping process.
Specify the websites you wish to scrape and any other relevant parameters.

Viewing and Analyzing Data:

Utilize the PostgreSQL database to query and analyze the scraped data.
Engage with ChatGPT through the application's interface to generate insights from the data.

Advanced OSINT with Spiderfoot:

Optionally, initiate Spiderfoot scans to gather additional intelligence related to your search terms.
For detailed documentation on each feature and additional configuration options, refer to the respective sections of this README.md file.

This guide provides a basic overview of getting started with the application. For more detailed information or troubleshooting, please consult the detailed documentation sections.

## Contributing

If you're interested in contributing to the project, please contact one of the developers. Utilize LightningBolt's Contact Page for contact methods.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

Charles Sanders (github.com/visionthex)
Tyrelle Robinson (github.com/RobBuilds)
Braden Walker (github.com/WalkerB20)
Tommy Daniel (github.com/tdronin)

### Happy Hacking!
