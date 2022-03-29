const { default: Axios } = require('axios');
const cheerio = require('cheerio')

const scrapIframe = async (link) => {
    console.log(link)
    const response = await Axios.get(link)
    const $ = cheerio.load(response.data)
    const streamLink = "https:" + $(response.data).find("iframe").attr("src")
    var iframe = '<iframe src=' + streamLink + ' allowfullscreen="true" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>'
    return iframe
}

module.exports = scrapIframe
