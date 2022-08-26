import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());

const users = [];

const tweets = [{
    username: "bobesponja",
    tweet: "eu amo o hub"
},{
    username: "lulu",
    tweet: "eu amo o hub"
}]

const posts = [];


function updatePosts () {
    const allTweets = [...tweets];

    allTweets.forEach(tweet => {
        const user = users.find(user => user.username === tweet.username);
        tweet.avatar = user.avatar;
    });

    posts.push(...allTweets);
}


server.post('/sign-up', (req, res) => {
    users.push(req.body);
    
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

    const userTweets = posts.filter(({ username }) => username === userName);

    res.send(userTweets);
});

server.listen(5000, () => console.log('Servidor rodando na porta 5000'));