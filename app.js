require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const Blog = require('./models/blog')

const app = express()

// connect to Mongo
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => app.listen(3000))
    .catch(err => console.log(err))

// /registe view engine
app.set('view engine', 'ejs');


//middleware statis files
app.use(express.static('public'))
app.use(morgan('dev'))

//mongo
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New blog 2',
        snippet: 'Aboy new blog',
        body: 'some more about my new blog fro you here to read on'
    }) 

    blog.save()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err)
        })
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

app.get('/single-blog', (req, res) => {
    Blog.findById('6477afb6772af2d40fee4dec')
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next()
})

app.use((req, res, next) => {
    console.log('in the next middleware');
   
    next()
})

app.get('/', (req, res) => {

    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];

    res.render('index', {title: 'Home', blogs})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'New Form'})
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'}) 
})

