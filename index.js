const express = require('express');
const app = express();
const Instagram = require('instagram-web-api');
const FileCookieStore = require('tough-cookie-filestore2');
require('dotenv').config()

const port = process.env.PORT || 4000

const cookieStore = new FileCookieStore('./cookies.json');

const client = new Instagram(
    {
        username: process.env.INSTAGRAM_USERNAME,
        password: process.env.INSTAGRAM_PASSWORD,
        cookieStore,
    },
    {
        language: 'en-US',
    }
);

const login = async () => {
    console.log('Loggin in...');

    await client.login().then(() => {
        console.log('Login successful!');
    }).catch((err) => {
        console.log('Login failed!');
        console.log(err);
    });
};

app.listen(port, () => {
    console.log(`Running on port ${port}...`)
});

login();