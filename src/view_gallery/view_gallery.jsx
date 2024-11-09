import React from "react";

export function View_Gallery() {
	return (
		<main className="container my-5">
			<div className="card p-4 shadow" style={{ maxWidth: "80%", margin: "auto" }}>
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
					<button className="btn btn-danger ms-2">Delete Gallery</button>
				</div>
				<h2 className="text-center mb-4">Analytics</h2>
				<div className="table-responsive">
					<table className="table table-bordered">
						<tr>
							<th className="text-center">Page Views</th>
							<th className="text-center">Downloads</th>
						</tr>
						<tr>
							<td className="text-center">0</td>
							<td className="text-center">0</td>
						</tr>
					</table>
				</div>
			</div>
		</main>
	);
}
