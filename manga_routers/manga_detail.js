const router = require('express').Router()
const { default: Axios } = require('axios')
const cheerio = require('cheerio')

router.post('/detail', async (req, res, next) => {
    const link = req.body.link
    const response = await Axios.get(link)
    const $ = cheerio.load(response.data)

    const a = $("p.description-update").html()

    let b = a.split("<br>")

    const length = $("p.description-update span").length
    console.log(length)
    let description = $('p#example2').text().replace(/(\r\n|\n|\r)/gm, "").replace(/\s{2,}/g, ' ').trim()
    let views = b[1].split("</span>")[1].trim()
    let author = b[2].split("</span>")[1].trim()
    let lastUpdated = b[6].split("</span>")[1].trim() == "" ? "2020" : b[6].split("</span>")[1].trim()
    let status = b[7].split("</span>")[1].trim()



    const genreList = []
    b[4].split("</span>")[1].trim().split("</a>").forEach((item) => {
        if (item.split(">")[1] != null) {
            genreList.push(item.split(">")[1].trim())
        }
    })
    const chapterList = []
    $('div.chapter-list li.row').each((index, item) => {
        chapterList.push({
            title: $(item).find('h4 a').attr('title'),
            link: $(item).find('h4 a').attr('href')
        })
    })

    res.json({
        author,
        status,
        lastUpdated,
        views,
        description,
        genreList,
        chapterList
    })
})


module.exports = router