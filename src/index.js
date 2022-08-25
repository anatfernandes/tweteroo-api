import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());

const users = [
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    },
    {
        username: "lulinha",
        avatar: "https://imgLulinha"
    },
    {
        username: "patrick",
        avatar: "https://imgPatrick"
    },
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    }
]

const tweets = [
    {
        username: "bobesponja",
        tweet: "eu amo o hub"
    },
    {
        username: "lulinha",
        tweet: "odeio o @bobesponja"
    },
    {
        username: "bobesponja",
        tweet: "hehe"
    },
    {
        username: "patrick",
        tweet: "quero comer"
    }
]


server.get('/tweets', (req, res) => {
    const lastTweets = tweets.reverse().slice(0, 10);

    lastTweets.forEach(tweet => {
        const user = users.find(user => user.username === tweet.username);
        tweet.avatar = user.avatar
    });

    res.send(lastTweets);
});

server.get('/tweets/:username', (req, res) => {
    const userName = req.params.username;

    const userTweets = tweets.filter(({ username }) => username === userName);

    userTweets.forEach(tweet => {
        const user = users.find(user => user.username === tweet.username);
        tweet.avatar = user.avatar
    });

    res.send(userTweets);
});

server.listen(5000, () => console.log('Servidor rodando na porta 5000'));