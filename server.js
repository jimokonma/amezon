const fs = require("fs");
const http = require("http");
const url = require("url");

const port = 9000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === "POST" && parsedUrl.pathname === "/save") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      const { email, password } = JSON.parse(data);
      // Write email and password to file
      fs.appendFile("user_data.txt", `${email}, ${password}\n`, (err) => {
        if (err) throw err;
        console.log("User data saved to file.");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("User data saved to file.");
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
