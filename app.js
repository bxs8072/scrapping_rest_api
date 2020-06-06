const express = require('express')
const bodyParser = require('body-parser')
const popularRouter = require('./Router/PopularRouter')
const moviesRouter = require('./Router/MoviesRouter')
const newSeasonRouter = require('./Router/NewSeasonRouter')
const latestAnimeRouter = require('./Router/LatestAnimeRouter')
const genreRouter = require('./Router/GenreRouter')
const seasonRouter = require('./Router/SeasonRouter')
const animeDetailRouter = require('./Router/AnimeDetailRouter')
const iframeRouter = require('./Router/IframeRouter')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.get('/', (req, res, next) => {
    res.json({
        "Success": true
    })
})

app.use('/popular', popularRouter)
app.use('/movies', moviesRouter)
app.use('/newseason', newSeasonRouter)
app.use('/latestanime', latestAnimeRouter)
app.use('/genre', genreRouter)
app.use('/season', seasonRouter)
app.use('/detail', animeDetailRouter)
app.use('/iframe', iframeRouter)



const PORT = 3000 || process.env.PORT
app.listen(PORT, () => {
    console.log('server is running in port: ' + PORT)
})