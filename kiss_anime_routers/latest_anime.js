const scrapLatestAnime = require('../kiss_anime_fetchers/latest_anime_fetcher')
const latestType = require('../utils/latest_type')
const router = require('express').Router()

const getList = async (type, page) => {
    let list = []
    if (type == 1) {
        list = await scrapLatestAnime(latestType.SUB, page)
    } else if (type == 2) {
        list = await scrapLatestAnime(latestType.DUB, page)
    } else if (type == 3) {
        list = await scrapLatestAnime(latestType.CHINESE, page)
    }

    return list
}

router.get("/latest/:type/:page", async (req, res, next) => {
    const type = parseInt(req.params.type)
    let list = await getList(type, req.params.page)
    console.log(list)
    res.json(list)
})
module.exports = router