
const router = require('express').Router()
const scrapEpisodes = require('../kiss_anime_fetchers/episode_fetcher')

router.post("/episode", async (req, res, next) => {
    const title = req.body.title
    const link = req.body.link
    const lastEpisode = req.body.lastEpisode
    console.log(lastEpisode)

    const list = await scrapEpisodes(link, lastEpisode, title)

    res.json(list)
})

module.exports = router