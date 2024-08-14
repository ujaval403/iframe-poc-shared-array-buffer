const httpServer = require("http-server");
const port = 8080;

const server = httpServer.createServer({
  headers: {
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "require-corp",
  },
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
