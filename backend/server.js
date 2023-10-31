const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv/config');

// middle-wares

app.use(logger);
app.use(express.static('./public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('*', getHandler);

let count = 0;

// functions

function getHandler(req, res) {
    count++;
    const ipAddr = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

    let text;
    
    if(req.cookies.visited) {     
        text = "Welcome back !";
    } else {
        text = "You are new on this site !";
        res.cookie("visited", "true");
    }
    
    return res.status(200).render('home', { ipAddr, count, text });
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
