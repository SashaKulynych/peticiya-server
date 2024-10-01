const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

import router from './app/api/data'
import { getData } from './app/utils'

const app = express();

app.use(express.static('public'));
app.use('/source', express.static('src/source'));
app.use(cors());
app.use(bodyParser.json())
app.use(router);

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
  const fileData = getData()
  console.log(`Server has started.`, fileData)
});

server.setTimeout(500000);

module.exports = app;