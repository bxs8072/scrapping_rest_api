const express = require('express')
const { animeFetcher } = require('../gogo_anime_fetchers/anime_fetcher')
const { BASEURL } = require('../utils/constants')

const router = express.Router()

router.post('/', async (req, res, next) => {
    var page = req.body.page
    var genre = req.body.genre.toString().split(' ').join('-')
    var link = BASEURL + '/genre/' + genre + '?page=' + page
    var animeList = await animeFetcher(link)
    res.json({
        animeList
    })
})

module.exports = router