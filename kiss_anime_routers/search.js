const searchAnime = require('../kiss_anime_fetchers/search_fetcher')
const router = require('express').Router()

router.post("/search", async (req, res, next) => {
    const keywords = req.body.keywords.split(" ").join("+")
    const list = await searchAnime(keywords)
    res.json(list)
})

module.exports = router