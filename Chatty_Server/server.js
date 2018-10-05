// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const generateRandomColor = () =>
    Array.from('BADA55').reduce((acc, nxt) =>
        acc.concat(
            '0123456789ABCDEF' [Math.floor(Math.random() * 16)]
        ), '#');

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    const userColor = generateRandomColor();

    wss.clients.forEach(function each(client, altclient, set) {
        const userCountMessage = {
            type: "userCountChanged",
            userCount: set.size,
            usernameColor: userColor,
        };

        client.send(JSON.stringify(userCountMessage));
    })

    ws.on('message', function incoming(message) {
        console.log("message received");
        const uuid = uuidv4();
        const messageObject = JSON.parse(message);

        if (messageObject.type === "postMessage") {
            messageObject.type = "incomingMessage";

            wss.clients.forEach(function each(client) {
                messageObject["uuid"] = uuid;
                messageObject["color"] = userColor;

                client.send(JSON.stringify(messageObject));
                console.log("message sent");
            });
        } else if (messageObject.type === "postNotification") {
            messageObject.type = "incomingNotification";

            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify(messageObject));
                console.log("message sent");
            });
        }
    });

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        console.log('Client disconnected');

        const userCountMessage = {
            type: "userCountChanged",
            userCount: wss.clients.size,
        };

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(userCountMessage));
            }
        })
    });
});