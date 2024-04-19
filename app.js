const express = require('express');
const app = express();
const connectToDatabase = require('./config/db');
const bodyParser = require('body-parser');
connectToDatabase();

app.use(bodyParser.json()); 

// Middleware pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Router
app.get('/', (req, res) => {
  res.send('Ca marche!! Yess!!!');
});



const port = process.env.PORT || 3000 ;
app.set('port', port);

// Écouter sur le port spécifié
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
