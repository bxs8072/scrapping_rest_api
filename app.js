const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//import manga routers
const homeSliderRouter = require('./manga_routers/home_slider')
const mangaRouter = require('./manga_routers/manga')
const mangaDetailRouter = require('./manga_routers/manga_detail')
const imagesRouter = require('./manga_routers/images')

//import anime routers
const popularRouter = require('./gogo_anime_routers/PopularRouter')
const moviesRouter = require('./gogo_anime_routers/MoviesRouter')
const newSeasonRouter = require('./gogo_anime_routers/NewSeasonRouter')
const latestAnimeRouter = require('./gogo_anime_routers/LatestAnimeRouter')
const latestDubAnimeRouter = require('./gogo_anime_routers/LatestDubAnimeRouter')
const latestChineseAnimeRouter = require('./gogo_anime_routers/LatestChineseAnimeRouter')
const genreRouter = require('./gogo_anime_routers/GenreRouter')
const seasonRouter = require('./gogo_anime_routers/SeasonRouter')
const dubAnimeRouter = require('./gogo_anime_routers/DubAnimeRouter')
const searchAnimeRouter = require('./gogo_anime_routers/SearchAnimeRouter')
const animeDetailRouter = require('./gogo_anime_routers/AnimeDetailRouter')
const iframeRouter = require('./gogo_anime_routers/IframeRouter')
const notificationRouter = require('./gogo_anime_routers/NotificationRouter')
const animeScheduleRouter = require('./gogo_anime_routers/AnimeScheduleRouter')

//Import Kiss Anime Routers
const kissAnimeRouter = require("./kiss_anime_routers/anime")
const kissAnimeEpisodeRouter = require("./kiss_anime_routers/episode")
const kissAnimeLatestAnimeRouter = require("./kiss_anime_routers/latest_anime")
const kissAnimeSearchRouter = require("./kiss_anime_routers/search")
const kissAnimeDetailRouter = require("./kiss_anime_routers/anime_detail")
const kissAnimeIframeRouter = require("./kiss_anime_routers/iframe")
const kissAnimeNotificatonRouter = require("./kiss_anime_routers/notification")

notificationRouter.notify()
notificationRouter.notify2()
notificationRouter.notify3()

//Kiss Anime routers
// app.use('/kissanime', kissAnimeRouter)
// app.use('/kissanime', kissAnimeEpisodeRouter)
// app.use('/kissanime', kissAnimeLatestAnimeRouter)
// app.use('/kissanime', kissAnimeSearchRouter)
// app.use('/kissanime', kissAnimeDetailRouter)
// app.use('/kissanime', kissAnimeIframeRouter)

//Manga routers
app.use('/manga', homeSliderRouter)
app.use('/manga', mangaRouter)
app.use('/manga', mangaDetailRouter)
app.use('/manga', imagesRouter)

//Anime routers
app.use('/popular', popularRouter)
app.use('/movies', moviesRouter)
app.use('/newseason', newSeasonRouter)
app.use('/latestanime', latestAnimeRouter)
app.use('/latestdubanime', latestDubAnimeRouter)
app.use('/latestchineseanime', latestChineseAnimeRouter)
app.use('/genre', genreRouter)
app.use('/season', seasonRouter)
app.use('/dub', dubAnimeRouter)
app.use('/search', searchAnimeRouter)
app.use('/detail', animeDetailRouter)
app.use('/iframe', iframeRouter)
app.use('/airinganime', animeScheduleRouter)

module.exports = app