import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageDialog } from "../login/messageDialog";

export function View_Gallery() {
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
							<button className="btn btn-danger ms-2">Delete Gallery</button>
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
					</>
				)}
			</div>
		</main>
	);
}
