const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');

// middle-wares

app.use(logger);
app.use(express.static('./public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => { res.status(200).render('home'); });


// functions


function logger(req, res, next) {

    console.log(req.hostname + ' ' + req.method + ''+ req.path);
    next();
}

// listener

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening on port '+ port +'..');
});
