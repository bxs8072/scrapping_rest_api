const scrapAnime = require('../kiss_anime_fetchers/anime_fetcher')
const router = require('express').Router()

router.post("/anime", async (req, res, next) => {
    const type = req.body.type
    const genre = req.body.genre.split(" ").join("-").toLowerCase()
    const page = req.body.page
    console.log(type, genre, page)
    const list = await scrapAnime(type, genre, page)
    res.json(list)
})

module.exports = router