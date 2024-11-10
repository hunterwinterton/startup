import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./authenticated.css";

export function Authenticated(props) {
	const navigate = useNavigate();

	function logout() {
		localStorage.removeItem("userName");
		props.onLogout();
	}

	return (
		<main className="d-flex justify-content-center align-items-center vh-100">
			<div
				className="card p-4 shadow-lg"
				style={{ maxWidth: "400px", width: "100%" }}
			>
				<h2 className="text-center mb-4">Welcome, {props.userName}</h2>
				<div className="d-grid gap-2">
					<Button
						variant="primary"
						onClick={() => navigate("/create")}
						className="btn-block"
					>
						Create
					</Button>
					<Button variant="secondary" onClick={logout} className="btn-block">
						Logout
					</Button>
				</div>
			</div>
		</main>
	);
}
