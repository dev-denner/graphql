"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const server = http.createServer(app_1.default);
server.listen(3000);
server.on('listening', () => console.log('Listening on port 3000...'));
