const express = require('express')
const app = express()
const port = 3000

const secure = (req, res, next) => {
    const { token } = req.query;
if (token) {
    next()
} else {
    res.status(403).send('You are not authorized')
}
};

const warning = (req, res) => {
    res.send('You have accessed a protected area!')
};

const userPage = (req, res) => {
    const { id, postId } = req.params;
    console.log(req.params)
    res.send(`this is the page of post ${postId} for user ${id}`);
}

 
app.get('/', (req, res) => res.send('Hello World!'))
app.get('/login', (req, res) => res.send('please login'))
app.get('/protected-area', secure, warning);
app.get('/dashboard', secure, warning);
app.get('/users/:id/posts/:postId', userPage);
 
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))