import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 750,
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    padding: theme.spacing(3),
  },
  inline: {
    display: "inline",
  },
}));

const aboutDetails = [
  {
    title: "Description:",
    content: "LightningBolt is an open-source intelligence application designed to empower users by scraping websites and obtaining specific information. It leverages a modern tech stack including Node.js, PostgreSQL for the database, Knex.js for database queries, Express, MUI (Material-UI), Tailwind CSS, ChatGPT, Puppeteer for web scraping, and React for the frontend.",
  },
  {
    title: "Features:",
    content: "The feature list for LightningBolt is currently being developed. Expect updates as new functionalities are implemented and refined.",
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
    content: "The usage instructions for LightningBolt are to be determined. Stay tuned for updates on how to utilize this powerful open-source intelligence tool.",
  },
  {
    title: "Contributors:",
    content: "Thank you to all who contributed to this project: Charles Sanders, Tyrelle Robinson, Tommy Daniel, Braden Walker. See our contact page for more info.",
  }
  
];

const AboutPage = () => {
  const classes = useStyles();

  return (
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
  );
};

export default AboutPage;
