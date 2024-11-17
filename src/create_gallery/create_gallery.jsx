import React, { useState } from "react";
import { MessageDialog } from "./messageDialog";

export function Create_Gallery() {
  const [galleryName, setGalleryName] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	async function handleCreateGallery() {
		try {
			const response = await fetch("/api/galleries", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("userToken"),
				},
				body: JSON.stringify({ name: galleryName }),
			});
			if (response.ok) {
				setSuccess("Gallery created successfully!");
				setError(null);
				setGalleryName("");
			} else {
				const body = await response.json();
				setError(body.msg);
				setSuccess(null);
			}
		} catch (err) {
			setError("An error occurred while creating the gallery.");
			setSuccess(null);
		}
	}

	return (
		<main className="d-flex justify-content-center align-items-center vh-100">
			<div
				className="card p-4 shadow-lg"
				style={{ maxWidth: "400px", width: "100%" }}
			>
				<h2 className="text-center mb-4">Create a New Gallery</h2>
				{error && (
					<MessageDialog message={error} onHide={() => setError(null)} />
				)}
				{success && (
					<MessageDialog message={success} onHide={() => setSuccess(null)} />
				)}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleCreateGallery();
					}}
				>
					<div className="mb-3">
						<label htmlFor="galleryName" className="form-label">
							Gallery Name
						</label>
						<input
							type="text"
							id="galleryName"
							className="form-control"
							placeholder="Enter Gallery Name"
							value={galleryName}
							onChange={(e) => setGalleryName(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="uploadPhotos" className="form-label">
							Upload Photos
						</label>
						<input
							type="file"
							id="uploadPhotos"
							className="form-control"
							multiple
						/>
					</div>
					<div className="d-grid gap-2">
						<button type="submit" className="btn btn-primary">
							Create Gallery
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}
