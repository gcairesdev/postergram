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
        post();
    }).catch((err) => {
        console.log('Login failed!');
        console.log(err);
    });
};

const post = async () => {
    await client.uploadPhoto({
        photo: './img/1.jpg',
        caption: 'Legenda',
        post: 'feed'
    }).then(async (res) => {
        const media = res.media;

        console.log(`https://instagram.com/p/${media.code}`);

        await client.addComment({
            mediaId: media.id,
            text: "Comentário"
        });
    });
};

app.listen(port, () => {
    console.log(`Running on port ${port}...`)
});

login();