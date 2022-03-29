const express = require('express')
const { BASEURL } = require('../utils/constants')
const { latestAnimeFetcher } = require('../gogo_anime_fetchers/latest_anime_fetcher')

const router = express.Router()

router.get('/:page', async (req, res, next) => {
    var page = req.params.page
    var link = BASEURL + '?page=' + page

    var animeList = await latestAnimeFetcher(link)
    res.json({
        animeList
    })
})

module.exports = router