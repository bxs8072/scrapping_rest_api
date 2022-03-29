const express = require('express')
const axios = require('axios').default
const cheerio = require('cheerio')
const { BASEURL } = require('../utils/constants')

const router = express.Router()

router.post('/', (req, res, next) => {
    var link = req.body.link
    if (link.includes("gogoanime.pe")) {
        link = BASEURL + link.split("gogoanime.pe")[1]
    }

    axios(link)
        .then(response => {
            var html = response.data;
            var $ = cheerio.load(html);
            var episodeList = [];
            var epLength;
            var season;
            var description;
            var status;
            var genreList = [];
            var otherName;


            $('div.anime_info_body_bg').each((index, element) => {
                season = $($(element).find("p")[1]).find("a").attr("title");
                description = $($(element).find("p")[2]).text().split(":")[1].trim();
                status = $($(element).find("p")[5]).text().split(":")[1].trim();
                otherName = $($(element).find("p")[6]).text().split("name:")[1].trim();
                $($(element).find("p")[3]).each((i, f) => {
                    for (var i = 0; i < $(f).find("a").length; i++) {
                        genreList.push($($(f).find("a")[i]).attr("title"));
                    }
                });
            });

            var liLength = $('ul#episode_page > li').length - 1;

            $('ul#episode_page').each((index, element) => {
                epLength = parseInt($($(element).find("li")[liLength]).find("a").attr("ep_end"));
            });

            for (var i = 1; i <= epLength; i++) {
                episodeList.push({
                    title: "Episode " + i,
                    link: BASEURL + "/" + link.split("ry/")[1] + "-episode-" + i,
                });
            }

            res.send({
                'season': season,
                'description': description,
                'status': status,
                'otherName': otherName,
                'genreList': genreList,
                'episodeList': episodeList
            }
            );
        }).catch(error => {
            console.log(error)
        })

})

module.exports = router