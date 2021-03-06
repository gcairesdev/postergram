const dotenv = require('dotenv');
const cron = require('node-cron');
const express = require('express');
const Instagram = require('instagram-web-api');
const FileCookieStore = require('tough-cookie-filestore2');

dotenv.config()
const app = express();
const port = process.env.PORT || 4000

cron.schedule('0 19 * * 4', async () => {
    const cookieStore = new FileCookieStore('./cookies.json');
    const credentials = {
        username: process.env.INSTAGRAM_USERNAME,
        password: process.env.INSTAGRAM_PASSWORD,
        cookieStore
    };
    const client = new Instagram(credentials, { language: 'en-US' });

    const login = async () => {
        console.log('Loggin in...');
        await client.login().then(() => {
            console.log('Login successful!');
            post();
        }).catch((err) => {
            console.log('Login failed!');
            console.log(err);
        });
    };

    const post = async () => {
        await client.uploadPhoto({
            photo: `./img/${randomIntFromInterval(1, 50)}.jpg`,
            caption: '',
            post: 'feed'
        }).then(async (res) => {
            const media = res.media;
            console.log(`https://instagram.com/p/${media.code}`);
        });
    };

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    login();
});

app.listen(port, () => {
    console.log(`Running on port ${port}...`)
});
