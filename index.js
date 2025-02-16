const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

const getHadith = (filename, maxId, id = null) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(process.cwd(), "data", filename), "utf8", (err, data) => {
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
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f8f9fa; text-align: center; }
                    .container { max-width: 800px; margin: 0 auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                    h1 { color: #333; }
                    a { text-decoration: none; color: #007bff; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Hadith API</h1>
                    <p>Use the API to fetch Hadiths from different sources.</p>
                    <h2>Endpoints</h2>
                    <ul>
                        <li><a href="/bukhari/1">/bukhari/1</a></li>
                        <li><a href="/muslim/1">/muslim/1</a></li>
                        <li><a href="/abudawud/1">/abudawud/1</a></li>
                        <li><a href="/ibnmajah/1">/ibnmajah/1</a></li>
                        <li><a href="/tirmidhi/1">/tirmidhi/1</a></li>
                    </ul>
                    <h2>Documentation</h2>
                    <p>Visit <a href="https://en-hadith-api.vercel.app/" target="_blank">API Documentation</a></p>
                </div>
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
