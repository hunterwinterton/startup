import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MessageDialog } from "../login/messageDialog";

export function View_Galleries() {
	const [galleries, setGalleries] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchGalleries() {
			try {
				const response = await fetch("/api/galleries", {
					method: "GET",
					headers: {
						Authorization: localStorage.getItem("userToken"),
					},
				});
				if (response.ok) {
					const data = await response.json();
					setGalleries(data);
				} else {
					const body = await response.json();
					setError(body.msg);
				}
			} catch (err) {
				setError("Failed to load galleries.");
			}
		}

		fetchGalleries();
	}, []);

	return (
		<main
			className="container my-md-5"
			style={{ display: "flex", alignItems: "flex-start" }}
		>
			<div>
				<div>
					<h2 className="text-center mb-4">Your Galleries</h2>
				</div>
				{error && (
					<MessageDialog message={error} onHide={() => setError(null)} />
				)}
				<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
					{galleries.length === 0 && !error && (
						<div className="col text-center">
							<p>No galleries found.</p>
						</div>
					)}
					{galleries.map((gallery) => (
						<div key={gallery.id} className="col">
							<NavLink
								to={`/view/${gallery.id}`}
								className="d-block"
								style={{ textDecoration: "none" }}
							>
								<div
									className="shadow-sm position-relative"
									style={{
										width: "100%",
										aspectRatio: "1",
										overflow: "hidden",
										cursor: "pointer",
										borderRadius: "15px",
									}}
								>
									<div
										className="position-absolute w-100 h-100"
										style={{
											background: "rgba(0, 0, 0, 0.3)",
											zIndex: 1,
											top: 0,
											left: 0,
										}}
									></div>
									<div
										className="text-center position-absolute d-flex align-items-center justify-content-center w-100 h-100"
										style={{
											color: "white",
											fontWeight: "bold",
											fontSize: "2rem",
											zIndex: 2,
										}}
									>
										{gallery.name}
									</div>
									<img
										src="sample-img.jpg"
										className="img-fluid"
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
											borderRadius: "15px",
										}}
									/>
								</div>
							</NavLink>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
