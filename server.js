import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("IPTV Proxy çalışıyor");
});

// Yayın proxy
app.get("/stream", async (req, res) => {

    const url = req.query.url;

    if (!url) {
        return res.status(400).send("URL eksik");
    }

    try {

        const response = await fetch(url, {
            redirect: "follow",
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "*/*"
            }
        });

        if (!response.ok) {
            return res.status(response.status).send(await response.text());
        }

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Content-Type",
            response.headers.get("content-type") ||
            "application/vnd.apple.mpegurl"
        );

        const data = await response.text();

        res.send(data);

    } catch (error) {

        console.error(error);

        res.status(500).send("Yayın alınamadı");

    }

});

const PORT = 3000;

app.listen(PORT, () => {

    console.log(`Proxy aktif: http://localhost:${PORT}`);

});