const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/user_routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://carod:clemL34270+@cluster0-fbriu.gcp.mongodb.net/running_map?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connexion ok')
}).catch(err => {
    console.log(err)
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cors());

app.use(userRoute);

module.exports = app;