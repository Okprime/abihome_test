require('dotenv').config();
import express from 'express';
import cors from 'cors';
import './app/settings/settings';
import user from './app/route/user';
import post from './app/route/post';


const app = express();

const port = process.env.PORT || 8080;
const appName = process.env.APP_NAME;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.use(cors());
app.use(user);
app.use(post);


app.get('/', function (req, res) {
    console.log('Welcome to abihome backend API');
    res.send('Welcome to abihome backend API');
});

app.listen(port, (res) => {
    console.log(`${appName} is listening on ${port}`);
});
