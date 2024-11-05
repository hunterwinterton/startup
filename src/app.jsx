import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

export default function App() {
	return (
		<div className="body bg-dark text-light">
			<header className="sticky-top bg-light p-3">
				<div className="d-flex align-items-center">
					<div className="d-flex align-items-center">
						<img className="me-2" src="logo.png" width="50em" />
						<h1 className="mb-0">
							Photo Galleries<sup>&reg;</sup>
						</h1>
					</div>

					<nav className="navbar navbar-expand-lg bg-light ms-4">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item fs-4">
								<a className="nav-link" href="index.html">
									Home
								</a>
							</li>
							<li className="nav-item fs-4">
								<a className="nav-link" href="create_gallery.html">
									Create Gallery
								</a>
							</li>
							<li className="nav-item fs-4">
								<a className="nav-link" href="view_galleries.html">
									View Galleries
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			<main>App components go here</main>

			<footer className="sticky-bottom bg-light p-1 mt-4">
				<div className="d-flex flex-column flex-lg-row align-items-center justify-content-start">
					<div className="d-flex align-items-center me-3 mb-2 mb-lg-0">
						<span className="text-reset">Hunter Winterton</span>
					</div>
					<nav className="navbar">
						<ul className="navbar-nav d-flex flex-row">
							<li className="nav-item">
								<a
									href="https://github.com/hunterwinterton/startup/blob/main/"
									className="nav-link fs-5 me-3"
								>
									GitHub
								</a>
							</li>
							<li className="nav-item">
								<a href="https://www.hunterwinterton.com" className="nav-link fs-5">
									Website
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</footer>
		</div>
	);
}
