import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageDialog } from "../login/messageDialog";

export function Public_Gallery() {
	const [gallery, setGallery] = useState(null);
	const [error, setError] = useState(null);
	const { galleryId } = useParams();

	useEffect(() => {
		async function fetchGallery() {
			try {
				const response = await fetch(`/api/galleries/${galleryId}`, {
					method: "GET",
					credentials: "include",
				});
				if (response.ok) {
					const data = await response.json();
					setGallery(data);
				} else {
					const body = await response.json();
					setError(body.msg || "Failed to load gallery");
				}
			} catch (err) {
				setError("Failed to load gallery");
			}
		}

		fetchGallery();

		// WebSocket
		const protocol = window.location.protocol === "https:" ? "wss" : "ws";
		const ws = new WebSocket(`${protocol}://${window.location.host}/ws`);

		ws.onopen = () => {
			console.log("WebSocket connected for public gallery.");
			ws.send(JSON.stringify({ type: "viewing", galleryId }));
		};

		ws.onmessage = (event) => {
			try {
				const message = JSON.parse(event.data);
				if (message.type === "viewers" && message.galleryId === galleryId) {
					console.log(
						`Viewer count for gallery ${galleryId}: ${message.count}`
					);
				} else {
					console.warn("Unexpected WebSocket message:", message);
				}
			} catch (err) {
				console.error("Error parsing WebSocket message:", err);
			}
		};

		ws.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		ws.onclose = () => {
			console.log("WebSocket connection closed for public gallery.");
		};

		// Cleanup on component unmount
		return () => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(JSON.stringify({ type: "left", galleryId }));
			}
			ws.close();
		};
	}, [galleryId]);

	return (
		<main className="container my-5">
			<div
				className="card p-4 shadow"
				style={{ maxWidth: "80%", margin: "auto" }}
			>
				{error && (
					<MessageDialog message={error} onHide={() => setError(null)} />
				)}
				{!gallery && !error && <div className="text-center">Loading...</div>}
				{gallery && (
					<>
						<h2 className="text-center mb-4">{gallery.name}</h2>
						<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
							<div className="col">
								<img src="/sample-img.jpg" className="img-fluid rounded" />
							</div>
							<div className="col">
								<img src="/sample-img.jpg" className="img-fluid rounded" />
							</div>
							<div className="col">
								<img src="/sample-img.jpg" className="img-fluid rounded" />
							</div>
						</div>
						<div className="d-flex justify-content-center my-4 button-container">
							<button className="btn btn-primary me-2">Download Images</button>
						</div>
					</>
				)}
			</div>
		</main>
	);
}
