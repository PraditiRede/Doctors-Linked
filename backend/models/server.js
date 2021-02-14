const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/routes.js');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/app', routes);
app.listen(4000, () => console.log("server running"));