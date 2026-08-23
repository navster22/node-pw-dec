const http = require("http");
const fs = require("fs");

const PORT = 3000;

const server = http.createServer((req, res) => {
    if(req.method === 'GET' && req.url === "/"){
        fs.readFile("./hello.html", (err, data) => {
            if(err){
                res.statusCode = 500;
                res.end("Something went wrong");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html",
            });
            res.end(data)
        })
    } else if(req.method === 'GET' && req.url === "/about"){
        res.writeHead(200, {
            "Content-Type": "text/plain",
        });
        res.end("About Page")
    } else {
        res.writeHead(404, {
            "Content-Type": "text/plain",
        });
        res.end(`Page not found`);
    }
    
})

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
