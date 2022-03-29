const express = require('express')
const { latestAnimeFetcher } = require('../gogo_anime_fetchers/latest_anime_fetcher')
const router = express.Router()

router.get('/:page', async (req, res, next) => {
    var page = req.params.page

    var url = require('../utils/constants').BASEURL

    var BASEURL = 'https://ajax.apimovie.xyz/ajax/page-recent-release.html'

    var link = BASEURL + '?page=' + page + "&type=2"

    var animeList = await latestAnimeFetcher(link)
    res.json({
        animeList
    })
})

module.exports = router