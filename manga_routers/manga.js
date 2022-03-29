const router = require('express').Router()
const { mangaFetcher } = require('../manga_fetchers/manga_fetcher')
const { BASE_URL } = require('../utils/constants')

router.get('/latest/:page', async (req, res, next) => {
    const link = BASE_URL + "/latest-manga" + "?page=" + req.params.page
    const list = await mangaFetcher(link)
    res.json(list)
})

router.get('/popular/:page', async (req, res, next) => {
    const link = BASE_URL + "/popular-manga" + "?page=" + req.params.page
    const list = await mangaFetcher(link)
    res.json(list)
})

router.get('/completed/:page', async (req, res, next) => {
    const link = BASE_URL + "/completed-manga" + "?page=" + req.params.page
    const list = await mangaFetcher(link)
    res.json(list)
})

router.get('/ongoing/:page', async (req, res, next) => {
    const link = BASE_URL + "/status/ongoing" + "?page=" + req.params.page
    const list = await mangaFetcher(link)
    res.json(list)
})

router.post('/genre', async (req, res, next) => {
    const genre = req.body.genre.toLowerCase().trim().split(" ").join("-")
    const page = req.body.page
    const link = BASE_URL + "/mangas/" + genre + "?page=" + page
    const list = await mangaFetcher(link)
    res.json(list)
})

router.post('/search', async (req, res, next) => {
    const keywords = req.body.keywords.split(" ").join("+")

    const link = BASE_URL + "/search?q=" + keywords
    const list = await mangaFetcher(link)
    res.json(list)
})


module.exports = router