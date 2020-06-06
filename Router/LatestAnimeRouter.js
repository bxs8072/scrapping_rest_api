const express = require('express')
const axios = require('axios').default
const cheerio = require('cheerio')

const router = express.Router();

router.get('/:page', (req, res, next) => {
    var page = req.params.page;

    var baseUrl = 'https://www19.gogoanime.io';

    axios.get(baseUrl + '/?page=' + page).then(response => {
        const $ = cheerio.load(response.data)
        var animeList = [];
        $('ul.items li').each((i, item) => {

            animeList.push({
                'image': $(item).find('img').attr('src'),
                'title': $(item).find('p.name a').text().trim(),
                'link': baseUrl + '/category' + $(item).find('div.img a').attr('href').split('-epis')[0],
                'latestEpisode': $(item).find('p.episode').text().trim(),
            })
        })

        res.json({
            animeList
        })
    }).catch(error => {
        console.log(error)
    })
})

module.exports = router