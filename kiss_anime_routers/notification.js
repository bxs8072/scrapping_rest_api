var kissAnimeAdmin = require("firebase-admin")
var kissAnime = require("./kissAnime.json")
const fs = require('fs');
const scrapLatestAnime = require("../kiss_anime_fetchers/latest_anime_fetcher");
const latestType = require("../utils/latest_type");
const subFile = __dirname + '/sub.json';
const readSubFile = JSON.parse(fs.readFileSync(subFile))
const dubFile = __dirname + '/dub.json';
const readDubFile = JSON.parse(fs.readFileSync(dubFile))
const chineseFile = __dirname + '/chinese.json';
const readChineseFile = JSON.parse(fs.readFileSync(chineseFile))

kissAnimeAdmin.initializeApp({
    credential: kissAnimeAdmin.credential.cert(kissAnime),
    dataBASEURL: "https://historm-196e9.firebaseio.com"
}, "kissAnime")

const fcm = kissAnimeAdmin.messaging();

exports.notify = async function () {
    var animeList = await scrapLatestAnime(latestType.SUB, 1);
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
                lastEpisode: animeList[0].lastEpisode.toString(),
                link: animeList[0].link,
                released: animeList[0].released,

            },
        };
        var options = {
            priority: "high",
        };
        fcm.sendToCondition(condition, payload, options)
            .then((response) => {
                console.log('Successfully sent message:', payload);

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
}

exports.notify2 = async function () {
    var animeList = await scrapLatestAnime(latestType.DUB, 1);
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
                lastEpisode: animeList[0].lastEpisode.toString(),
                link: animeList[0].link,
                released: animeList[0].released,

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
}

exports.notify3 = async function () {
    var animeList = await scrapLatestAnime(latestType.CHINESE, 1);
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
                lastEpisode: animeList[0].lastEpisode.toString(),
                link: animeList[0].link,
                released: animeList[0].released,

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
                        "chinese": animeList[0].title,
                    }));
            });
    }
}
