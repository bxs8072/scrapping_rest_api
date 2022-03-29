const { default: Axios } = require('axios');
const cheerio = require('cheerio');
const { BASE_URL } = require('../utils/base_url');

const searchAnime = async (keywords) => {
    let url = BASE_URL + '/?s=' + keywords
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

module.exports = searchAnime
