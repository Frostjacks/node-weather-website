const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '/templates/views'); // by default express looks inside src/views folder for templates
const partialsPath = path.join(__dirname, '/templates/partials')

// setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve i.e tells express to use public folder for static files 
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aayush Dhakal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aayush Dhakal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Aayush Dhakal'
    })
})


app.get('/weather', (req, res)=>{
    const address = req.query.address

    if(!address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(address, (error, {longitude, latitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }
    
        forecast(longitude, latitude, (error, forecastData)=>{
            if(error) {
                return res.send({
                    error
                })
            }
    
            res.send({
                forecast: forecastData,
                location,
                address
            })

            
            
        })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aayush Dhakal',
        errorMessage: 'Help article not found.'
    })
})

// handle all of those request that hasn't being matched so far
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aayush Dhakal',
        errorMessage: 'Page not found.'
    })
})




app.listen(3000, ()=>{
    console.log('server is up')
})