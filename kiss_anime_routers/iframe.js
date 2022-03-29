const scrapIframe = require('../kiss_anime_fetchers/iframe_fetcher')
const searchAnime = require('../kiss_anime_fetchers/search_fetcher')
const router = require('express').Router()

router.post("/iframe", async (req, res, next) => {
    const link = req.body.link
    const iframe = await scrapIframe(link)
    console.log(iframe)
    res.json({
        iframe
    })
})

module.exports = router