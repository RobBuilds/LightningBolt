import React, { useState } from 'react';
import '../styles/Scrape.css';

function ScrapeComponent() {
    const classes = useStyles();
    const [method, setMethod] = React.useState(false);
  
    const handleToggle = () => {
      setMethod(!method);
    };
}

    export default ScrapeComponent;