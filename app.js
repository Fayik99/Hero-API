const express = require('express');
const mongoose = require('mongoose');
const heroes = require('./routes/heroes');
const home = require('./routes/home');
const authenticator = require('./middlewares/authenticator');
const sendEmail = require('./middlewares/sendEmail');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(authenticator);
app.use(sendEmail);
app.use('/api/heroes', heroes);
app.use('/', home);

mongoose
.connect("mongodb://localhost/herodb", {useNewUrlParser: true,  useUnifiedTopology: true})
.then(() => console.log("Connected to DB successfully"))
.catch(err => console.log("Error has occured while connecting to DB : ", err));


app.listen(PORT, function(){

    console.log("Listening on port " + PORT);

});