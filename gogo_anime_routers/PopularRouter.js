const express = require('express')
const router = express.Router()
const { BASEURL } = require('../utils/constants');
const { animeFetcher } = require('../gogo_anime_fetchers/anime_fetcher');


router.get('/:page', async (req, res, next) => {
    var page = req.params.page

    var link = BASEURL + '/popular.html?page=' + page
    var animeList = await animeFetcher(link)
    res.json({
        animeList
    })
})

module.exports = router