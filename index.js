const express = require('express')
const path = require('path')

const app = express();


app.use(express.static(__dirname + '/dist/filme-recomendator'));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);