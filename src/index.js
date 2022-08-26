import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());

const users = [];

const tweets = []

let posts = [];


function updatePosts () {
    const allTweets = [...tweets];

    allTweets.forEach(tweet => {
        const user = users.find(user => user.username === tweet.username);
        tweet.avatar = user.avatar;
    });

    posts = allTweets;
}


server.post('/sign-up', (req, res) => {
    users.push(req.body);

    res.send("OK");
});

server.post('/tweets', (req, res) => {
    tweets.push(req.body);
    
    res.send("OK");
});

server.get('/tweets', (req, res) => {
    updatePosts();

    const lastTweets = posts.reverse().slice(0, 10);

    res.send(lastTweets);
});

server.get('/tweets/:username', (req, res) => {
    updatePosts();

    const userName = req.params.username;

    const userTweets = posts.filter(({ username }) => username === userName).reverse();

    res.send(userTweets);
});

server.listen(5000, () => console.log('Servidor rodando na porta 5000'));