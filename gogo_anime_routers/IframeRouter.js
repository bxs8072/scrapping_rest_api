const express = require('express')
const axios = require('axios').default
const parse = require('node-html-parser').parse

const router = express.Router()

router.post('/', (req, res, next) => {
    var link = req.body.link

    axios.get(link).then(response => {
        var document = parse(response.data)

        var iframeLink = "https:" + document.querySelector('div.play-video iframe').attributes['src']

        var downloadLink = document
            .querySelectorAll(
                'div.anime_video_body_cate a')[4]
            .attributes['href']

        res.json({
            'iframeLink': iframeLink,
            'downloadLink': downloadLink
        })
    }).catch(error => {
        console.log(error)
    })
})

module.exports = router