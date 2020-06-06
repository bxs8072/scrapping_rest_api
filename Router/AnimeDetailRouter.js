const express = require('express')
const axios = require('axios').default
const parse = require('node-html-parser').parse

const router = express.Router();

router.post('/', (req, res, next) => {
    var link = req.body.link

    var baseUrl = "https://www19.gogoanime.io";

    axios.get(link).then(response => {

        const document = parse(response.data);

        var detail = document.querySelectorAll('div.anime_info_body_bg p.type');

        //Info
        var season = detail[0].querySelector('a').text;
        var status = detail[4].text.split(":")[1].trim();
        var description = detail[1].text.split('mary:')[1].trim();
        var otherName = detail[5].text.split(":")[1].trim();

        //Genres
        var genreList = [];
        detail[2].querySelectorAll('a').forEach((item) => {
            genreList.push(item.attributes['title'])
        })

        //Episode
        var a = document.querySelectorAll('#episode_page li a');
        var end = parseInt(a[a.length - 1].text.split('-')[1].trim())

        var episodeList = [];
        for (var i = 1; i <= end; i++) {
            episodeList.push({
                "link": baseUrl + link.split('category')[1] + '-episode-' + i,
                "title": 'Episode ' + i,
            })
        }

        res.json({
            'season': season,
            'description': description,
            'status': status,
            'otherName': otherName,
            'genreList': genreList,
            'episodeList': episodeList
        })
    }).catch(error => {
        console.log(error)
    })
})

module.exports = router