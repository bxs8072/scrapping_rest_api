const router = require('express').Router()
const { default: Axios } = require('axios')
const cheerio = require('cheerio')

router.post('/images', async(req, res, next) => {
    const link = req.body.link
    const response = await Axios.get(link)
    const $ = cheerio.load(response.data)  

    const imageList = []

    $('p#arraydata').text().split(",").forEach((item, index) => {
        imageList.push(item);
    })
    
    res.json({
        imageList
    })
})


module.exports = router