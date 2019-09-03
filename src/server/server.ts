import path = require('path');
import express = require('express');
import apiRouter from './routes';
import './middleware/bearerstrategy';
import './middleware/localstrategy';
import * as passport from 'passport';
import bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
let p = path.join(__dirname, '../public');
app.use(express.json())
app.use(express.static(p));
app.use(apiRouter);
app.use(passport.initialize());

app.route('/auth').get(passport.authenticate(''))

app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
