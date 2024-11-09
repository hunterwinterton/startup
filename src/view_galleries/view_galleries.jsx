import React from "react";

export function View_Galleries() {
	return (
		<main className="container my-md-4 my-lg-5">
			<div>
				<div>
					<h2 className="text-center mb-4">Your Galleries</h2>
				</div>
				<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
					<div className="col">
						<NavLink
							to="View_Gallery"
							className="d-block"
							style={{ textDecoration: none }}
						>
							<div
								className="shadow-sm"
								style="
									width: 100%;
									aspect-ratio: 1;
									overflow: hidden;
									cursor: pointer;
								"
							>
								<img
									src="sample-img.jpg"
									className="img-fluid"
									style="
										width: 100%;
										height: 100%;
										object-fit: cover;
										border-radius: 15px;
									"
								/>
							</div>
						</NavLink>
					</div>
				</div>
			</div>
		</main>
	);
}
