import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageDialog } from "../login/messageDialog";
import { NavLink } from "react-router-dom";

export function View_Gallery() {
	const [gallery, setGallery] = useState(null);
	const [error, setError] = useState(null);
	const [viewers, setViewers] = useState(0);
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
			console.log("WebSocket connected for view gallery.");
		};

		ws.onmessage = (event) => {
			const message = JSON.parse(event.data);
			if (message.type === "viewers" && message.galleryId === galleryId) {
				setViewers(message.count);
			}
		};

		ws.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		ws.onclose = () => {
			console.log("WebSocket connection closed for view gallery.");
		};

		// Cleanup on component unmount
		return () => {
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
								<img
									src="/sample-img.jpg"
									className="img-fluid rounded"
									alt="Sample"
								/>
							</div>
							<div className="col">
								<img
									src="/sample-img.jpg"
									className="img-fluid rounded"
									alt="Sample"
								/>
							</div>
							<div className="col">
								<img
									src="/sample-img.jpg"
									className="img-fluid rounded"
									alt="Sample"
								/>
							</div>
						</div>
						<div className="d-flex justify-content-center my-4 button-container">
							<button className="btn btn-primary me-2">Download Images</button>
							<button className="btn btn-danger me-2">Delete Gallery</button>
							<NavLink
								className="btn btn-primary me-2"
								to={`/share/${galleryId}`}
								target="_blank"
							>
								Share Gallery
							</NavLink>
						</div>
						<h2 className="text-center mb-4">Analytics</h2>
						<div className="table-responsive">
							<table className="table table-bordered">
								<thead>
									<tr>
										<th className="text-center">Page Views</th>
										<th className="text-center">Downloads</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="text-center">0</td>
										<td className="text-center">0</td>
									</tr>
								</tbody>
							</table>
						</div>
						<p style={{ fontSize: "1.25rem" }}>Currently Viewing: {viewers}</p>
					</>
				)}
			</div>
		</main>
	);
}
