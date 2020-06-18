const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const forecast = require('./utils/forecast')



app.use(express.static(path.join(__dirname, '../public')))
app.set("view engine", 'hbs' )
app.set("views", path.join(__dirname, "../templates/views"))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        author : 'Pranav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        author : 'Pranav'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        author : 'Pranav'
    })
})



app.get('/weather', (req, res) => {
    console.log("Query params:" + req.query)
    if(!req.query.location){
        return res.send({
            error : "You must pass location parameter"
        });
    }

    return forecast(req.query.location, (error, response) => {
        if(error){
            return res.send({
                error
            }); 
        }
        const {humidity, temperature} = response;
        const location = req.query.location;
        return res.send({
            humidity,
            temperature,
            location
        });
    })
    
})

app.get('/help/*', (req,res) => {
    res.render('notFound', {
        title : 'Not Found',
        author : 'Pranav',
        errorMessage : 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('notFound', {
        title : 'Not Found',
        author : 'Pranav',
        errorMessage : 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server started')
})