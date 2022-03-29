var admin = require("firebase-admin")
var serviceAccount = require("../serviceAccountKey.json")
const axios = require('axios').default
const cheerio = require('cheerio')

const fs = require('fs');
const subFile = __dirname + '/sub.json';
const readSubFile = JSON.parse(fs.readFileSync(subFile))
const dubFile = __dirname + '/dub.json';
const readDubFile = JSON.parse(fs.readFileSync(dubFile))
const chineseFile = __dirname + '/chinese.json';
const readChineseFile = JSON.parse(fs.readFileSync(chineseFile))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    dataBASEURL: "https://anime-plus-beb4e.firebaseio.com"
})

const fcm = admin.messaging();

exports.notify = function () {
    var BASEURL = require('../utils/constants').BASEURL
    axios.get(BASEURL).then(response => {
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
        var titleFromFile = readSubFile.sub;
        if (titleFromFile != animeList[0].title) {
            var title = "'" + animeList[0].title.split(' ').join('').replace(/[^a-zA-Z0-9]/g, "") + "'"
            var condition = title + " in topics || 'all' in topics"
            var payload = {
                notification: {
                    title: animeList[0].title,
                    image: animeList[0].image,
                    icon: "https://lh3.googleusercontent.com/As3CZ5843q3aWyGrMQLdtYVM7gg38zUPTRP1rE62nd3TEaNfnAaah9nDPNeXAFqaqU0=s360-rw",
                    body: animeList[0].latestEpisode + " has been released",
                    click_action: 'FLUTTER_NOTIFICATION_CLICK'
                },
                data: {
                    title: animeList[0].title,
                    image: animeList[0].image,
                    latestEpisode: animeList[0].latestEpisode,
                    link: animeList[0].link
                },
            };
            var options = {
                priority: "high",
            };
            fcm.sendToCondition(condition, payload, options)
                .then((response) => {
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                }).finally(() => {
                    fs.writeFileSync(subFile, JSON.stringify(
                        {
                            "sub": animeList[0].title,
                        }));
                });
        }
    }).catch(error => {
        console.log(error)
    })
}

exports.notify2 = function () {
    var url = 'https://www19.gogoanime.io'
    var BASEURL = 'https://ajax.apimovie.xyz/ajax/page-recent-release.html?page=1&type=2'
    axios.get(BASEURL).then(response => {
        const $ = cheerio.load(response.data)
        var animeList = []
        $('ul.items li').each((i, item) => {
            animeList.push({
                'image': $(item).find('img').attr('src'),
                'title': $(item).find('p.name a').text().trim(),
                'link': url + '/category' + $(item).find('div.img a').attr('href').split('-epis')[0],
                'latestEpisode': $(item).find('p.episode').text().trim(),
            })
        })

        var titleFromFile = readDubFile.dub;
        if (titleFromFile != animeList[0].title) {
            var title = "'" + animeList[0].title.split(' ').join('').replace(/[^a-zA-Z0-9]/g, "") + "'"
            var condition = title + " in topics || 'all' in topics"
            var payload = {
                notification: {
                    title: animeList[0].title,
                    image: animeList[0].image,
                    icon: "https://lh3.googleusercontent.com/As3CZ5843q3aWyGrMQLdtYVM7gg38zUPTRP1rE62nd3TEaNfnAaah9nDPNeXAFqaqU0=s360-rw",
                    body: animeList[0].latestEpisode + " has been released",
                    click_action: 'FLUTTER_NOTIFICATION_CLICK'
                },
                data: {
                    title: animeList[0].title,
                    image: animeList[0].image,
                    latestEpisode: animeList[0].latestEpisode,
                    link: animeList[0].link
                },
            };
            var options = {
                priority: "high",
            };
            fcm.sendToCondition(condition, payload, options)
                .then((response) => {
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                }).finally(() => {
                    fs.writeFileSync(dubFile, JSON.stringify(
                        {
                            "dub": animeList[0].title,
                        }));
                });
        }


    }).catch(error => {
        console.log(error)
    })
}

exports.notify3 = function () {
    var url = 'https://www19.gogoanime.io'

    var BASEURL = 'https://ajax.apimovie.xyz/ajax/page-recent-release.html?page=1&type=3'
    axios.get(BASEURL).then(response => {
        const $ = cheerio.load(response.data)
        var animeList = []
        $('ul.items li').each((i, item) => {
            animeList.push({
                'image': $(item).find('img').attr('src'),
                'title': $(item).find('p.name a').text().trim(),
                'link': url + '/category' + $(item).find('div.img a').attr('href').split('-epis')[0],
                'latestEpisode': $(item).find('p.episode').text().trim(),
            })
        })

        var titleFromFile = readChineseFile.chinese;

        if (titleFromFile != animeList[0].title) {
            var title = "'" + animeList[0].title.split(' ').join('').replace(/[^a-zA-Z0-9]/g, "") + "'"
            var condition = title + " in topics || 'all' in topics"
            var payload = {
                notification: {
                    title: animeList[0].title,
                    image: animeList[0].image,
                    icon: "https://lh3.googleusercontent.com/As3CZ5843q3aWyGrMQLdtYVM7gg38zUPTRP1rE62nd3TEaNfnAaah9nDPNeXAFqaqU0=s360-rw",
                    body: animeList[0].latestEpisode + " has been released",
                    click_action: 'FLUTTER_NOTIFICATION_CLICK'
                },
                data: {
                    title: animeList[0].title,
                    image: animeList[0].image,
                    latestEpisode: animeList[0].latestEpisode,
                    link: animeList[0].link
                },
            };
            var options = {
                priority: "high",
            };
            fcm.sendToCondition(condition, payload, options)
                .then((response) => {
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                }).finally(() => {
                    fs.writeFileSync(chineseFile, JSON.stringify(
                        {
                            "chinese": animeList[0].title
                        }));
                });
        }

    }).catch(error => {
        console.log(error)
    })
}