const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 8177);
const root = process.cwd();
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((request, response) => {
    let route = decodeURIComponent(request.url.split("?")[0]);
    if (route === "/" || route === "") route = "/index.html";
    const file = path.resolve(root, `.${route}`);

    if (!file.toLowerCase().startsWith(root.toLowerCase())) {
      response.writeHead(403);
      response.end("forbidden");
      return;
    }

    fs.readFile(file, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end("not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
      });
      response.end(data);
    });
  })
  .listen(port, "127.0.0.1");
