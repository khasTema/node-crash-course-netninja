require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')


const { find } = require('lodash')
const blogRoutes = require('./routes/blogRoutes')

const app = express()

// connect to Mongo
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => app.listen(3000))
    .catch(err => console.log(err))

// /registe view engine
app.set('view engine', 'ejs');


//middleware statis files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))


// basic routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

// blog router 

app.use('/blogs', blogRoutes)
 

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'}) 
})

