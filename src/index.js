import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());

const users = [];

const tweets = [];

let posts = [];


function updatePosts () {
    posts = [...tweets];

    posts.forEach(tweet => {
        const user = users.find(user => user.username === tweet.username);
        tweet.avatar = user.avatar;
    });
}


server.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
        res.status(400).send({ message:"Todos os campos são obrigatórios!" });
        return;
    }

    const hasUsername = users.find(({ username: user }) => user === username);

    if (hasUsername) {
        res.status(409).send({ message:"Nome já existente" });
        return;
    }

    users.push({ username, avatar, views:0 });

    res.status(201).send({ message:"OK" });
});

server.post('/tweets', (req, res) => {
    const { user } = req.headers;
    const { tweet } = req.body;

    if (!user || !tweet) {
        res.status(400).send({ message:"Todos os campos são obrigatórios!" });
        return;
    }

    tweets.push({
        date: new Date().toLocaleDateString('pt-br'),
        time: new Date().toLocaleTimeString('pt-br'),
        username: user,
        tweet
    });

    res.status(201).send({ message:"OK" });
});

server.get('/tweets', (req, res) => {
    const page = Number(req.query.page);
    const qtdTweets = 10;

    if (page && page >= 1) {

        updatePosts();

        const lastTweets = posts
            .reverse()
            .slice((qtdTweets * (page - 1)), (qtdTweets * page))
        ;
    
        res.status(200).send(lastTweets);
        return;
    }

    res.status(400).send({ message:"Informe uma página válida!" });
});

server.get('/tweets/:username', (req, res) => {

    updatePosts();

    const user = req.params.username;

    const userViews = users.find(({ username }) => username === user);
    userViews.views += 1;

    const userTweets = posts
        .filter(({ username }) => username === user)
        .map(post => ({ ...post, userViews: userViews.views }))
        .reverse()
    ;

    res.status(200).send(userTweets);
});

server.listen(5000, () => console.log('Servidor rodando na porta 5000'));