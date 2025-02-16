const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

const getHadith = (filename, maxId, id = null) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "data", filename), "utf8", (err, data) => {
            if (err) return reject(err);
            
            const hadiths = JSON.parse(data).hadith;
            const selectedId = id ? id - 1 : Math.floor(Math.random() * maxId);
            
            if (selectedId < 0 || selectedId >= maxId) {
                return reject({ error: "Invalid Hadith ID" });
            }
            resolve({ data: hadiths[selectedId] });
        });
    });
};

app.get("/", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Hadith API</title>
            </head>
            <body>
                <h1>Hadith API</h1>
                <p>Use the API to fetch Hadiths from different sources.</p>
            </body>
        </html>
    `);
});

const collections = {
    bukhari: 7563,
    muslim: 3032,
    abudawud: 3998,
    ibnmajah: 4342,
    tirmidhi: 3956,
};

Object.keys(collections).forEach((key) => {
    app.get(`/${key}/:id?`, async (req, res) => {
        try {
            const hadith = await getHadith(`${key}.json`, collections[key], req.params.id);
            res.json(hadith);
        } catch (error) {
            res.status(400).json(error);
        }
    });
});

module.exports = app;
