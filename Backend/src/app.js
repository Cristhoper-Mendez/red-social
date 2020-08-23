//imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import errorhandler from "errorhandler";

//Inicitializations
require('dotenv').config();
require('./database')
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api', require('./routes/index'))
app.use('/api', require('./routes/login'))
app.use('/api', require('./routes/users'))

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

//errorhandlers
if('development' === app.get('env')) {
    app.use(errorhandler)
}

//initialize server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
})