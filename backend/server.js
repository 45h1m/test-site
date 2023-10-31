const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');

// middle-wares

app.use(logger);
app.use(express.static('./public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('*', getHandler);

let count = 0;

// functions

function getHandler(req, res) {
    count++;
    const ipAddr = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    return res.status(200).render('home', { ipAddr, count });
}


function logger(req, res, next) {
    const ipAddr = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
    console.log(ipAddr + ' ' + req.method + ''+ req.path);
    next();
}

// listener

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening on port '+ port +'..');
});
