const { default: Axios } = require("axios")
const cheerio = require('cheerio')

const mangaFetcher = async (link) => {
    const response = await Axios.get(link)

    const $ = cheerio.load(response.data)

    const list = []
    $('div.list-truyen-item-wrap').each((index, item) => {
        list.push({
            title: $(item).find('a').attr('title'),
            link: $(item).find('a').attr('href'),
            image: $(item).find('img').attr('src').includes('http') ? $(item).find('img').attr('src') : "https:" + $(item).find('img').attr('src'),
            chapter: $($(item).find('a')[2]).text().trim(),
        })
    })
    return list
}

exports.mangaFetcher = mangaFetcher