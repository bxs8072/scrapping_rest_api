const express = require('express');
const { animeFetcher } = require('../gogo_anime_fetchers/anime_fetcher');
const { BASEURL } = require('../utils/constants');

const router = express.Router()

router.get('/:page', async (req, res, next) => {
    var page = req.params.page
    var link = BASEURL + '/anime-movies.html?page=' + page
    var animeList = await animeFetcher(link)
    res.json({
        animeList
    })

})

module.exports = router