const { WebSocketServer } = require("ws");
const uuid = require("uuid");

function peerProxy(httpServer) {
	// Create a websocket object
	const wss = new WebSocketServer({ noServer: true });

	// Handle the protocol upgrade from HTTP to WebSocket
	httpServer.on("upgrade", (request, socket, head) => {
		wss.handleUpgrade(request, socket, head, function done(ws) {
			wss.emit("connection", ws, request);
		});
	});

	// Keep track of all the connections so we can forward messages
	let connections = [];
	let galleryViewers = {};

	wss.on("connection", (ws) => {
		const connection = { id: uuid.v4(), alive: true, ws: ws, galleryId: null };
		connections.push(connection);

		// Forward messages to everyone except the sender
		ws.on("message", (data) => {
			try {
				const message = JSON.parse(data);
				if (message.type === "viewing") {
					if (!galleryViewers[message.galleryId]) {
						galleryViewers[message.galleryId] = 0;
					}
					galleryViewers[message.galleryId]++;
					console.log(
						`Gallery ${message.galleryId} viewers:`,
						galleryViewers[message.galleryId]
					);
					broadcastViewers(message.galleryId);
				} else if (message.type === "left") {
					if (galleryViewers[message.galleryId]) {
						galleryViewers[message.galleryId]--;
						if (galleryViewers[message.galleryId] <= 0) {
							delete galleryViewers[message.galleryId];
						} else {
							broadcastViewers(message.galleryId);
						}
						console.log(
							`Gallery ${message.galleryId} viewers:`,
							galleryViewers[message.galleryId]
						);
					}
				} else {
					console.warn("Unknown message type received:", message.type);
				}
			} catch (err) {
				console.error("Error processing WebSocket message:", err);
			}
		});

		// Remove the closed connection so we don't try to forward anymore
		ws.on("close", () => {
			const pos = connections.findIndex((o, i) => o.id === connection.id);

			if (pos >= 0) {
				connections.splice(pos, 1);
			}
		});

		// Respond to pong messages by marking the connection alive
		ws.on("pong", () => {
			connection.alive = true;
		});
	});

	// Broadcast viewer counts to all connections
	function broadcastViewers(galleryId) {
		const count = galleryViewers[galleryId] || 0;
		const message = JSON.stringify({ type: "viewers", galleryId, count });

		connections.forEach((conn) => {
			conn.ws.send(message);
		});
	}

	// Keep active connections alive
	setInterval(() => {
		connections.forEach((c) => {
			// Kill any connection that didn't respond to the ping last time
			if (!c.alive) {
				c.ws.terminate();
			} else {
				c.alive = false;
				c.ws.ping();
			}
		});
	}, 10000);
}

module.exports = { peerProxy };
