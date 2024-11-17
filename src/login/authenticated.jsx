import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./authenticated.css";

export function Authenticated(props) {
	const navigate = useNavigate();

	const [fact, setFact] = React.useState("Loading...");

	React.useEffect(() => {
		fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
			.then((response) => response.json())
			.then((data) => {
				setFact(data.text);
			})
			.catch(() => setFact("Failed to load a fact"));
	}, []);

	function logout() {
		fetch(`/api/auth/logout`, {
			method: "delete",
		})
			.catch(() => {
				// Logout failed. Assuming offline
			})
			.finally(() => {
				localStorage.removeItem("userName");
				props.onLogout();
			});
	}

	return (
		<div className="d-flex flex-column vh-100 justify-content-center align-items-center vh-100">
			<div
				className="card p-4 shadow-lg mb-4"
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
			<div
				className="text-center mt-4"
				style={{ maxWidth: "400px", height: "200px", overflowY: "auto" }}
			>
				<p style={{ fontSize: "1.25rem" }}>{fact}</p>
			</div>
		</div>
	);
}
