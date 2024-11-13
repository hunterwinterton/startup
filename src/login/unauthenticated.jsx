import React from "react";

import Button from "react-bootstrap/Button";
import { MessageDialog } from "./messageDialog";

export function Unauthenticated(props) {
	const [userName, setUserName] = React.useState(props.userName);
	const [password, setPassword] = React.useState("");
	const [displayError, setDisplayError] = React.useState(null);

	async function loginUser() {
		loginOrCreate(`/api/auth/login`);
	}

	async function createUser() {
		loginOrCreate(`/api/auth/create`);
	}

	async function loginOrCreate(endpoint) {
		const response = await fetch(endpoint, {
			method: "post",
			body: JSON.stringify({ email: userName, password: password }),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		});
		if (response?.status === 200) {
			localStorage.setItem("userName", userName);
			props.onLogin(userName);
		} else {
			const body = await response.json();
			setDisplayError(`⚠ Error: ${body.msg}`);
		}
	}

	return (
		<>
			<div
				className="card p-4 shadow-lg"
				style={{ maxWidth: "400px", width: "100%" }}
			>
				<h2 className="text-center mb-4">Login to Create a Gallery</h2>
				<form onSubmit={(e) => e.preventDefault()}>
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
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
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
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Password"
								required
							/>
						</div>
					</div>
					<div className="d-grid gap-2">
						<Button
							variant="primary"
							onClick={() => loginUser()}
							disabled={!userName || !password}
						>
							Login
						</Button>
						<Button
							variant="secondary"
							onClick={() => createUser()}
							disabled={!userName || !password}
						>
							Create
						</Button>
					</div>
				</form>
			</div>

			<MessageDialog
				message={displayError}
				onHide={() => setDisplayError(null)}
			/>
		</>
	);
}
