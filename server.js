const express = require("express");
const http = require("http");
const RED = require("node-red");

const app = express();
const server = http.createServer(app);

app.use("/", express.static("public"));

// Configuration de Node-RED
const settings = {
  httpAdminRoot: "/red",
  httpNodeRoot: "/api",
  userDir: "./nodered",
  functionGlobalContext: {},

  // Très important pour que /ui fonctionne correctement
  ui: { path: "ui" }
};

RED.init(server, settings);

// Intégration avec Express
app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

// Démarrage du serveur
const PORT = process.env.PORT || 1880;
server.listen(PORT, () => {
  console.log("Serveur lancé sur http://localhost:" + PORT);
});

// Lancer Node-RED
RED.start();
