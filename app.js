const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/user_routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

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

app.use(cookieParser());

app.use(bodyParser.json());

app.use(userRoute);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;