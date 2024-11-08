/* Creating the App */

const express = require('express');
const PORT = 3000;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Submission Route
const posts = [];
const adminPosts = [];

// add data list later

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/entries', (req, res) => {
    res.render('entries', {posts: posts});
})

app.get('/admin-posts', (req, res) => {
    res.render('admin-posts', {data: adminPosts})
})

app.post('/submit', (req, res) => {
    // get current date
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();

    const newPost = {
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        time: `${hour}:${minutes} | ${day}-${month}-${year}`
    };


    posts.push(newPost);

    // admin only posts
    if (req.body.author == "Admin"){
        adminPosts.push(newPost);
    }

    res.render('confirmation', {post:newPost});

});



app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});