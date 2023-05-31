require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const Blog = require('./models/blog')
const { find } = require('lodash')

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



// basic routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})


//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})
        .then(result => {
            res.render('index', {
                title: 'All Blogs',
                blogs: result 
            })
        })
        .catch(err => console.log(err))
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'New Form'})
})

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'}) 
})

