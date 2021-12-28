import * as fs from "fs";
import http from 'http';
import * as url from "url";

const server = http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url);
    const resource = parsedUrl.pathname;
    if (resource.indexOf("/asset/")) {
        const stat = fs.statSync(__dirname + resource)
        const fileSize = stat.size
        const range = req.headers.range
        console.log("range", range)
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
            const chunksize = (end - start) + 1
            const file = fs.createReadStream(__dirname + resource, {start, end})
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head);
            fs.createReadStream(__dirname + resource).pipe(res);
        }
    }
})

server.listen(3001, function () {
    console.log('Server is running...');
});