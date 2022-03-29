const express = require('express')
const { BASEURL } = require('../utils/constants')
const { animeFetcher } = require('../gogo_anime_fetchers/anime_fetcher')

const router = express.Router()

router.get('/:page', async (req, res, next) => {
    var page = req.params.page
    var link = BASEURL + '//search.html?keyword=dub&page=' + page

    var animeList = await animeFetcher(link)
    res.json({
        animeList
    })
})

module.exports = router


