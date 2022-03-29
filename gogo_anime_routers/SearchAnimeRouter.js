const express = require('express')
const { BASEURL } = require('../utils/constants')
const { animeFetcher } = require('../gogo_anime_fetchers/anime_fetcher')
const router = express.Router()

router.post('/', async (req, res, next) => {
    var keyword = req.body.keyword.toString().split(' ').join('%20')
    var link = BASEURL + '//search.html?keyword=' + keyword
    var animeList = await animeFetcher(link)
    res.json({
        animeList
    })
})

module.exports = router


