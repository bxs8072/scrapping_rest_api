const { default: Axios } = require('axios');
const { BASE_URL } = require('../utils/base_url');
const cheerio = require('cheerio')

const scrapAnimeDetail = async (link) => {
    const response = await Axios.get(link)
    const $ = cheerio.load(response.data)

    var season = $($('div.director.list')[0]).find('a').text().trim()
    var status = $($('div.actors.list')[3]).text().trim().split('tus')[1].trim()
    var description = $('div.description').text().trim()
    var genreList = [];
    var premiered = $($('div.actors.list')[0]).text().trim().split('Premiered')[1].trim()
    var rating = $('span.kksr-legend').text().trim()
    $($('div.actors.list')[1]).find('a').each((index, item) => {
        genreList.push($(item).text().trim())
    })
    return {
        season, premiered, rating, status, description, genreList
    }
}

module.exports = scrapAnimeDetail
