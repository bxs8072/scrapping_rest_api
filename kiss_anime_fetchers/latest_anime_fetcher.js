const { default: Axios } = require('axios');
const cheerio = require('cheerio');
const latestType = require('../utils/latest_type');

const getUrl = (type, page) => {
    let url = ""
    if (type == latestType.SUB) {
        url = 'https://kissanimefree.net/page/' + page
    } else if (type == latestType.DUB) {
        url = 'https://kissanimefree.net/latest/dubbed/page/' + page
    } else {
        url = 'https://kissanimefree.net/latest/chinese'
    }
    return url
}

const scrapLatestAnime = async (type, page) => {
    let url = getUrl(type, page)
    console.log(url)
    let response = await Axios.get(url)
    let $ = cheerio.load(response.data)

    let list = []
    $('div.existing_item.res_item').each((index, element) => {
        list.push({
            title: $(element).find("span.movie-title a").attr('title'),
            link: $(element).find('div.movie-poster a').attr('href').split("-episode")[0].replace("episode/", ""),
            image: $(element).find('div.movie-poster img').attr('src'),
            released: $(element).find('time.timeS').text().trim().replace(/(\r\n|\n|\r)/gm, ""),
            lastEpisode: parseInt($(element).find('time.timeS').text().split("de")[1].trim())
        })
    })

    return list
}

module.exports = scrapLatestAnime
