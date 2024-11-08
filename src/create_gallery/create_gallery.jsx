import React from "react";

export function Create_Gallery() {
	return (
		<main className="d-flex justify-content-center align-items-center vh-100">
			<div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
				<h2 className="text-center mb-4">Create a New Gallery</h2>
				<form method="get" action="view_galleries.html">
					<div className="mb-3">
						<label htmlFor="galleryName" className="form-label">
							Gallery Name
						</label>
						<input
							type="text"
							id="galleryName"
							className="form-control"
							placeholder="Enter Gallery Name"
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
