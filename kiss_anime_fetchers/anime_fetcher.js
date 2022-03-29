const { default: Axios } = require('axios');
const cheerio = require('cheerio');
const animeType = require('../utils/anime_type');
const { BASE_URL } = require('../utils/base_url');

const getUrl = (type, genre, page) => {
    let url = ""
    if (type == animeType.GENRE) {
        url = BASE_URL + '/genres/' + genre + '/page/' + page
    } else if (type == animeType.DUB) {
        url = BASE_URL + '/lang/dubbed/page/' + page
    } else if (type == animeType.COMPLETED) {
        url = BASE_URL + '/anime-list/page/' + page + '/?status=completed'
    } else if (type == animeType.ONGOING) {
        url = BASE_URL + '/status/ongoing/page/' + page
    } else if (type == animeType.MOVIES) {
        url = BASE_URL + '/type/movie/page/' + page
    } else if (type == animeType.OVA) {
        url = BASE_URL + '/anime-list/page/' + page + '/?type=ova'
    } else if (type == animeType.ONA) {
        url = BASE_URL + '/anime-list/page/' + page + '/?type=ona'
    } else if (type == animeType.SPECIAL) {
        url = BASE_URL + '/anime-list/page/' + page + '/?type=special'
    } else if (type == animeType.TV_SERIES) {
        url = BASE_URL + '/anime-list/page/' + page + '/?type=tv'
    } else if (type == animeType.SEASON) {
        url = BASE_URL + '/season/' + genre + '/page/' + page
    } else {
        url = BASE_URL + '/page/' + page
    }
    return url
}

const scrapAnime = async (type, genre, page) => {
    let url = getUrl(type, genre, page)
    console.log(url)
    let response = await Axios.get(url)
    let $ = cheerio.load(response.data)

    let list = []
    $('div.existing_item.res_item').each((index, element) => {
        list.push({
            title: $(element).find("span.movie-title a").attr('title'),
            link: $(element).find('div.movie-poster a').attr('href'),
            image: $(element).find('div.movie-poster img').attr('src'),
            released: $(element).find('span.movie-release').text().trim().replace(/(\r\n|\n|\r)/gm, ""),
            lastEpisode: $(element).find('div.ep').text() == "" ? 1 :
                parseInt($(element).find('div.ep').text().split("Ep")[1].trim()
                    .split('/')[0])
        })
    })

    return list
}

module.exports = scrapAnime
