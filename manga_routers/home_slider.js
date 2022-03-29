const router = require('express').Router()
const { default: Axios } = require('axios')
const cheerio = require('cheerio')
const { BASE_URL } = require('../utils/constants')

router.get('/homeslider', async(req, res, next) => {
    const response = await Axios.get(BASE_URL)

    const $ = cheerio.load(response.data)
    const list = []

    $('div.owl-carousel div.item').each((index, item) => {
        list.push({
            title: $(item).find('a').attr('title'),
            link:  $(item).find('a').attr('href'),
            image: " https:" +  $(item).find('img').attr('src'),
            chapter:  $(item).find('h3 a').text().trim(),
        })
       
    })

    res.json(list)
})


module.exports = router