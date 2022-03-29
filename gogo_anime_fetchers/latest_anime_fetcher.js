const { default: Axios } = require("axios")
const cheerio = require('cheerio')
const { BASEURL } = require("../utils/constants")

const latestAnimeFetcher = async (link) => {

    const response = await Axios.get(link)
    
    const $ = cheerio.load(response.data)
   
    var animeList = []
    
    $('ul.items li').each((i, item) => {
        animeList.push({
            'image': $(item).find('img').attr('src'),
            'title': $(item).find('p.name a').text().trim(),
            'link': BASEURL + '/category' + $(item).find('div.img a').attr('href').split('-epis')[0],
            'latestEpisode': $(item).find('p.episode').text().trim(),
        })
    })

    return animeList     
}

exports.latestAnimeFetcher = latestAnimeFetcher