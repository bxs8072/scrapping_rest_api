const { BASE_URL } = require('../utils/base_url');

const scrapEpisodes = async (link, lastEpisode, title) => {
    var list = []
    for (var i = lastEpisode; i > 0; --i) {
        list.push({
            animeTitle: title,
            title: "Episode " + i,
            link: BASE_URL + "/episode/" + link.split("net/")[1].split("/")[0] + "-episode-" + i
        })
    }
    return list
}

module.exports = scrapEpisodes
