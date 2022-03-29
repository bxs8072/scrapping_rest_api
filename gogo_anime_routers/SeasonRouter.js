const express = require('express')
const router = express.Router()
const { BASEURL } = require('../utils/constants')
const { animeFetcher } = require('../gogo_anime_fetchers/anime_fetcher')

router.post('/', async (req, res, next) => {
    var page = req.body.page
    var season = req.body.season.toString().split(' ').join('-')

    //SEASON = OVA, ONA, special, tv-series

    var link = BASEURL + '/sub-category/' + season + '?page=' + page
    var animeList = await animeFetcher(link)
    res.json({
        animeList
    })

})

module.exports = router