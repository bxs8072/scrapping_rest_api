# Scrapping to Restful API

This the Node JS project that build the server to create the Restful API using the Express JS Framework

## Features
1. Scrap the website using cheerio
2. Fetch anime and manga by genres, lastest, popular, search and many more
3. Fetch the anime details like title, image, link, released date, author, description, list of episodes, etc.
4. Fetch the video URL link
5. Send the response in JSON format

## Sample
GET Request to address https://gogo-anime-7d379.appspot.com/popular/1
Response: 
<br>
{
  "animeList": [<br>
    {
      "image": "https://gogocdn.net/cover/honzuki-no-gekokujou-shisho-ni-naru-tame-ni-wa-shudan-wo-erandeiraremasen-3rd-season.png",
      "title": "Honzuki no Gekokujou: Shisho ni Naru Tame ni wa Shudan wo Erandeiraremasen 3rd Season",
      "link": "https://gogoanime.pe/category/honzuki-no-gekokujou-shisho-ni-naru-tame-ni-wa-shudan-wo-erandeiraremasen-3rd-season",
      "released": "Released: 2022"
    },<br>
    {
      "image": "https://gogocdn.net/cover/boruto-naruto-next-generations.png",
      "title": "Boruto: Naruto Next Generations",
      "link": "https://gogoanime.pe/category/boruto-naruto-next-generations",
      "released": "Released: 2017"
    },<br>
    {
      "image": "https://gogocdn.net/cover/platinum-end.png",
      "title": "Platinum End",
      "link": "https://gogoanime.pe/category/platinum-end",
      "released": "Released: 2021"
    },
    {
      "image": "https://gogocdn.net/cover/arifureta-shokugyou-de-sekai-saikyou-2nd-season.png",
      "title": "Arifureta Shokugyou de Sekai Saikyou 2nd Season",
      "link": "https://gogoanime.pe/category/arifureta-shokugyou-de-sekai-saikyou-2nd-season",
      "released": "Released: 2022"
    }
  ]
}

