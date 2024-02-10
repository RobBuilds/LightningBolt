import React from 'react';
import { makeStyles, Modal } from '@material-ui/core';
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Backdrop,
  Fade,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 750,
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
    padding: theme.spacing(3),
  },
  inline: {
    display: 'inline',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: '80vh', // 80% of the viewport height
    overflow: 'auto', // Enable scrolling when the content overflows the height
  },
}));

const aboutDetails = [
  {
    title: "Description:",
    content: "LightningBolt is an open-source intelligence application designed to empower users by scraping websites and obtaining specific information. It leverages a modern tech stack including Node.js, PostgreSQL for the database, Knex.js for database queries, Express, MUI (Material-UI) for styling, ChatGPT, Puppeteer for web scraping, and React for the frontend interactivity.",
  },
  {
    title: "Features:",
    content: `This application offers a comprehensive suite of tools for open-source intelligence (OSINT) gathering, designed to streamline the process of collecting, storing, and analyzing data from the web. Key features include:

    Keyword Search and Data Scraping: Utilize Puppeteer to perform keyword-based searches and scrape relevant data from specified websites. This feature allows for precise information gathering tailored to your intelligence requirements.

    Data Storage with PostgreSQL: Automatically store scraped data in a PostgreSQL database. This relational database management system ensures data integrity and provides robust query capabilities for analyzing collected information.

    Insights with ChatGPT: Leverage the power of ChatGPT to generate insights from the scraped data. ChatGPT can summarize information, identify trends, and even suggest areas for further investigation, enriching the intelligence gathering process.

    Containerization with Docker: The application is containerized using Docker, ensuring consistency across different computing environments and simplifying deployment and scalability. Docker containers encapsulate the application and its dependencies, making it easy to manage and distribute.

    Advanced OSINT with Spiderfoot: Integrate with Spiderfoot, an open-source tool for automating the process of gathering intelligence from various sources. Spiderfoot scans and analyzes data from social media, databases, and more, providing a comprehensive view of the digital footprint associated with your search terms.`,
  },
  {
    title: "Installation:",
    content: <ol>
    <li>Clone the repository: git clone https://github.com/RobBuilds/LightningBolt</li>
    <li>Navigate to the project directory: cd LightningBolt</li>
    <li>Install dependencies: npm install</li>
    <li>Start the app: npm start</li>
            </ol>
  },
  {
    title: "Usage:",
    content: `To get started with the application, follow these steps:

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

    This guide provides a basic overview of getting started with the application. For more detailed information or troubleshooting, please consult the detailed documentation sections.`,
  },
  {
    title: "Contributors:",
    content: "Thank you to all who contributed to this project: Charles Sanders, Tyrelle Robinson, Tommy Daniel, Braden Walker. See our contact page for more info.",
  }

];

const AboutPage = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List className={classes.root}>
                <Typography variant="h4" component="h1">
                  ABOUT LIGHTNINGBOLT:
                </Typography>
                {aboutDetails.map((detail, index) => (
                  <ListItem alignItems="flex-start" key={index}>
                    <ListItemText
                      primary={detail.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {detail.content}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default AboutPage;