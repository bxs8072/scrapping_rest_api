const fetch = require("node-fetch");
const express = require('express')

const router = express.Router()


var url = 'https://graphql.anilist.co';

router.get('/', (req, res, next) => {
    var query = `query (
        $weekStart: Int,
        $weekEnd: Int,
        $page: Int,
    ){
        Page(page: $page) {
            pageInfo {
                hasNextPage
                total
            }
            airingSchedules(
                airingAt_greater: $weekStart
                airingAt_lesser: $weekEnd
            ) {
                id
                episode
                airingAt
                media {
                    
    id
    idMal
    title {
        romaji
        native
        english
    }
    startDate {
        year
        month
        day
    }
    endDate {
        year
        month
        day
    }
    status
    season
    format
    genres
    synonyms
    duration
    popularity
    episodes
    source(version: 2)
    countryOfOrigin
    hashtag
    averageScore
    siteUrl
    description
    bannerImage
    isAdult
    coverImage {
        extraLarge
        color
    }
    trailer {
        id
        site
        thumbnail
    }
    externalLinks {
        site
        url
    }
    rankings {
        rank
        type
        season
        allTime
    }
    studios(isMain: true) {
        nodes {
            id
            name
            siteUrl
        }
    }
    relations {
        edges {
            relationType(version: 2)
            node {
                id
                title {
                    romaji
                    native
                    english
                }
                siteUrl
            }
        }
    }
    
    
                }
            }
        }
    }`;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var weekStart = today.getTime() / 1000;
    var weekEnd = weekStart + 604800 * 2;
    var variables = { weekStart: weekStart, weekEnd: weekEnd, page: 1 };

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };
    fetch(url, options).then(response => {
        handleResponse(response, res)
    })
        .then(handleData)
        .catch(handleError);
})

router.get('/:id', (req, res, next) => {
    var id = req.params.id
    var queryNew = `query media($id: Int) {
        Media(id: $id) {
            id
            title {
                userPreferred
                romaji
                english
                native
            }
            coverImage {
                extraLarge
                large
            }
            bannerImage
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
            description
            season
            type
            format
            status            
            duration  
            genres
            synonyms
            meanScore
            averageScore
            popularity
            favourites
            hashtag
            countryOfOrigin
            isLicensed
            nextAiringEpisode {
                airingAt
                timeUntilAiring
                episode
            }
            relations {
                edges {
                    id
                    relationType (version: 2)
                    node {
                        id
                        title {
                            userPreferred
                        }
                        format
                        type
                        status
                        coverImage {
                            large
                        }
                    }
                }
            }
            characters (perPage: 6, sort: [ROLE, ID]) {
                edges {
                    id
                    role
                    voiceActors (language: JAPANESE) {
                        id
                        name {
                            first
                            last
                        }
                        image {
                            large
                        }
                    }
                    node {
                        id
                        name {
                            first
                            last
                        }
                        image {
                            large
                        }
                    }
                }
            }
            staff (perPage: 8) {
                edges {
                    id
                    role
                    node {
                        id
                        name {
                            first
                            last
                        }
                        image {
                            large
                        }
                    }
                }
            }
            studios {
                edges {
                    isMain
                    node {
                        id
                        name
                    }
                }
            }
            reviews (perPage: 2, sort: RATING_DESC) {
                pageInfo {
                    total
                }
                nodes {
                    id
                    summary
                    rating
                    ratingAmount
                    user {
                        id
                        name
                        avatar {
                            large
                        }
                    }
                }
            }
            externalLinks {
                site
                url
            }
            streamingEpisodes {
                site
                title
                thumbnail
                url
            }
            trailer {
                id
                site
            }
            rankings {
                id
                rank
                type
                format
                year
                season
                allTime
                context
            }
            tags {
                id
                name
                description
                rank
                isMediaSpoiler
                isGeneralSpoiler
            }
            mediaListEntry {
                status
            }
            stats {
                statusDistribution {
                    status
                    amount
                }
                scoreDistribution {
                    score
                    amount
                }
            }
        }
    }`;
    var variablesNew = { id: id };
    var data = {
        query: queryNew,
        variables: variablesNew
    };


    var option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    };
    fetch(url, option).then(response => {
        handleDetailResponse(response, res)
    })
        .then(handleData)
        .catch(handleError);
})



function handleResponse(response, res) {
    return response.json().then(function (json) {
        var list = [];
        json.data.Page.airingSchedules.forEach(item => {
            var each = item.media
            var data = {
                episode: item.episode,
                airingAt: item.airingAt,
                title: each.title.romaji == null ? "" : each.title.romaji,
                nativetitle: each.title.native == null ? "" : each.title.native,
                id: each.id,
                duration: each.duration == null ? 20 : each.duration,
                idMal: each.idMal,
                startDate: each.startDate.month + "/" + each.startDate.day + "/" + each.startDate.year,
                status: each.status == null ? "" : each.status,
                season: each.season == null ? "" : each.season,
                synonyms: each.synonyms == null ? [] : each.synonyms,
                countryOfOrigin: each.countryOfOrigin,
                description: each.description == null ? "" : each.description,
                bannerImage: each.bannerImage,
                coverImage: each.coverImage.extraLarge == null ? "" : each.coverImage.extraLarge,
            }
            if ((data.airingAt * 1000) > Date.now()) {
                list.push(data)
            }
        });

        res.json({
            list
        })
        return response.ok ? json : Promise.reject(json);
    });
}

function handleDetailResponse(response, res) {
    return response.json().then(function (json) {
        var characters = [];
        var staffs = [];
        var studios = [];

        function secondsToHms(d) {
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);

            var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes ") : "";
            return hDisplay + mDisplay;
        }

        json.data.Media.characters.edges.forEach((each) => {
            var voiceactors = [];
            each.voiceActors.forEach(item => {
                voiceactors.push(
                    {
                        id: item.id,
                        fName: item.name.first,
                        lName: item.name.last === null ? "" : item.name.last,
                        image: item.image.large
                    }
                )
            })
            characters.push({
                id: each.id,
                role: each.role,
                voiceActors: voiceactors,
                nodeId: each.node.id,
                nodeName: each.node.name.first,
                image: each.node.image.large,
            })
        })

        json.data.Media.staff.edges.forEach((each) => {
            staffs.push({
                id: each.id,
                role: each.role,
                image: each.node.image.large,
                nodeId: each.node.id,
                nodeName: each.node.name.first + " " + each.node.name.last
            })
        })

        json.data.Media.studios.edges.forEach((each) => {
            studios.push({
                isMain: each.isMain,
                nodeId: each.node.id,
                nodeName: each.node.name
            })
        })

        var data = {
            timeUntilAiring: secondsToHms(json.data.Media.nextAiringEpisode.timeUntilAiring),
            nextAiringEpisode: json.data.Media.nextAiringEpisode.episode,
            characterList: characters,
            studioList: studios,
            staffList: staffs
        }

        res.json({
            data
        })
        return response.ok ? json : Promise.reject(json);
    });
}


function handleData(data) {
    console.log(data);
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}


module.exports = router
