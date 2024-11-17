import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { Create_Gallery } from "./create_gallery/create_gallery";
import { Public_Gallery } from "./public_gallery/public_gallery";
import { View_Galleries } from "./view_galleries/view_galleries";
import { View_Gallery } from "./view_gallery/view_gallery";
import { AuthState } from "./login/authState";

function App() {
      const [userName, setUserName] = React.useState(
				localStorage.getItem("userName") || ""
			);
			const currentAuthState = userName
				? AuthState.Authenticated
				: AuthState.Unauthenticated;
			const [authState, setAuthState] = React.useState(currentAuthState);

	return (
		<BrowserRouter>
			<header className="sticky-top bg-light p-3">
				<div className="d-flex align-items-center">
					<div className="d-flex align-items-center">
						<img className="me-2" src="logo.png" width="50em" />
						<h1 className="mb-0 text-gray">
							Photo Galleries<sup>&reg;</sup>
						</h1>
					</div>

					<nav className="navbar navbar-expand-lg bg-light ms-4">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item fs-4">
								<NavLink className="nav-link" to="">
									Home
								</NavLink>
							</li>
							{authState === AuthState.Authenticated && (
								<li className="nav-item fs-4">
									<NavLink className="nav-link" to="create">
										Create Gallery
									</NavLink>
								</li>
							)}
							{authState === AuthState.Authenticated && (
								<li className="nav-item fs-4">
									<NavLink className="nav-link" to="all">
										View Galleries
									</NavLink>
								</li>
							)}
						</ul>
					</nav>
				</div>
			</header>

			<Routes>
				<Route
					path="/"
					element={
						<Login
							userName={userName}
							authState={authState}
							onAuthChange={(userName, authState) => {
								setAuthState(authState);
								setUserName(userName);
							}}
						/>
					}
					exact
				/>
				<Route path="/public" element={<Public_Gallery />} />
				<Route path="/all" element={<View_Galleries />} />
				<Route path="/view/:galleryId" element={<View_Gallery />} />
				<Route path="/create" element={<Create_Gallery />} />
				<Route path="*" element={<NotFound />} />
			</Routes>

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
								<a
									href="https://www.hunterwinterton.com"
									className="nav-link fs-5"
								>
									Website
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</footer>
		</BrowserRouter>
	);
}

function NotFound() {
	return (
		<main className="container-fluid bg-secondary text-center">
			404: Return to sender. Address unknown.
		</main>
	);
}

export default App;