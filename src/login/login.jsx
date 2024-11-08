import React from "react";

export function Login() {
	return (
		<>
			<main className="d-flex justify-content-center align-items-center vh-100">
				<div
					className="card p-4 shadow-lg"
					style={{ maxWidth: "400px", width: "100%" }}
				>
					<h2 className="text-center mb-4">Login to Create a Gallery</h2>
					<form method="get" action="create_gallery.html">
						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								Email
							</label>
							<div className="input-group">
								<span className="input-group-text">@</span>
								<input
									type="email"
									className="form-control"
									id="email"
									placeholder="your@email.com"
									required
								/>
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<div className="input-group">
								<span className="input-group-text">🔒</span>
								<input
									type="password"
									className="form-control"
									id="password"
									placeholder="Password"
									required
								/>
							</div>
						</div>
						<div className="d-grid gap-2">
							<button type="submit" className="btn btn-primary">
								Login
							</button>
							<button type="button" className="btn btn-secondary">
								Create
							</button>
						</div>
					</form>
				</div>
			</main>
		</>
	);
}
