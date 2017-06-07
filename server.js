const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose');

const routes = require('./controllers/article-controllers');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

mongoose.Promise = Promise;

const dbUri = process.env.MONGODB_URI || "mongodb://localhost/nytsrch";

mongoose.connect(dbUri).then(() => console.log('connected to DB!')).catch((err) => console.log(err));

app.use('/', routes)

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); 
});