import React, { useState } from "react";
import { MessageDialog } from "../login/messageDialog";

export function Create_Gallery() {
	const [galleryName, setGalleryName] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	async function checkGalleryName() {
		try {
			const response = await fetch(
				`/api/galleries/check-name?name=${encodeURIComponent(galleryName)}`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			if (response.status === 409) {
				const body = await response.json();
				setError(body.msg);
				return false;
			}
			return true;
		} catch (err) {
			setError("An error occurred while checking the gallery name.");
			return false;
		}
	}

	async function handleCreateGallery() {
		const isAvailable = await checkGalleryName();
		if (!isAvailable) return;

		try {
			const response = await fetch("/api/galleries", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
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

	async function uploadFile(fileInput) {
		const file = fileInput.files[0];
		if (file) {
			const formData = new FormData();
			formData.append("file", file);

			const response = await fetch("/upload", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();
			if (response.ok) {
				document.querySelector("#upload").src = `/file/${data.file}`;
			} else {
				alert(data.message);
			}
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
							accept=".png, .jpeg, .jpg"
							onChange="uploadFile(this)"
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
