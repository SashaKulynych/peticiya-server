const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

import router from './src/router'
import { getData } from './src/utils'

const app = express();

app.use(express.static('public'));
app.use('/source', express.static('src/source'));
app.use(cors());
app.use(bodyParser.json())
app.use(router);

const server = http.createServer(app);

server.listen(process.env.PORT || 5000, () => {
  getData()
  console.log(`Server has started.`)
});