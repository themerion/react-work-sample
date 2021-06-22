
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());
app.options("*", cors());
app.use(express.static(path.join(__dirname, "static")));

let data = [
    {id: 24, text: "Have you considered joining the latest Dota tournament? Lots of merch. Build your community.", image: {path: "http://localhost:3001/dota2_social.jpg", width: 616, height: 353}},
    {id: 11, text: "Did you know the prize pool for CS tournaments are huge?", image: {path: "http://localhost:3001/Counter-Strike-GO.jpg", width: 700, height: 450}},
    {id: 99, text: "Play Valorant now, and climb the rankings. Win big prizes.", image: {path: "http://localhost:3001/VALORANT.jpg", width: 1200, height: 675}},
    {id: 25, text: "Hearthstone is not yet available, but if you are highly ranked, please make a petition to Blizzard. Community particiption is huge!"}
];

app.get("/search", async (req, res) => {
    await timeout(1000 + Math.random()*2000); // Simulate network lag. Wait between 1 and 3 seconds.

    let phrase = req.query?.phrase;
    if(!phrase) {
        res.status(400);
        res.send("Expected query parameter 'phrase'");
        return;
    }

    const result = data.filter(x => x.text.toLowerCase().indexOf(phrase.toLowerCase())>-1);

    res.status(200);
    res.send(JSON.stringify(result));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
