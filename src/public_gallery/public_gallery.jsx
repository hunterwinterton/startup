import React from "react";

export function Public_Gallery() {
	return (
		<main className="container my-5">
            <div className="card p-4 shadow" style={{ maxWidth: "80 %", margin: "auto" }}>
				<h2 className="text-center mb-4">Gallery Name</h2>
				<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
					<div className="col">
						<img src="sample-img.jpg" className="img-fluid rounded" />
					</div>
					<div className="col">
						<img src="sample-img.jpg" className="img-fluid rounded" />
					</div>
					<div className="col">
						<img src="sample-img.jpg" className="img-fluid rounded" />
					</div>
				</div>
				<div className="d-flex justify-content-center my-4 button-container">
					<button className="btn btn-primary me-2">Download Images</button>
				</div>
			</div>
		</main>
	);
}
