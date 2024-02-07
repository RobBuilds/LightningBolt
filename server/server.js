const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;


app.get('/', (req, res) => res.send("My API is up and running Yo!"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});