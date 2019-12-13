const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router.js');
const PORT = 3001;
const app = express();

app.use(express.static(`localhost:${PORT}`));
app.use(cors());
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀  Server running on localhost:${PORT}`);
});