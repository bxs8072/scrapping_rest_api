const scrapAnimeDetail = require('../kiss_anime_fetchers/anime_detail_fetcher')

const router = require('express').Router()

router.post("/detail", async (req, res, next) => {
    const link = req.body.link

    const detail = await scrapAnimeDetail(link)
    res.json(detail)
})

module.exports = router