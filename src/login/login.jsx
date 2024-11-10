import React from "react";
import { Unauthenticated } from "./unauthenticated";
import { Authenticated } from "./authenticated";
import { AuthState } from "./authState";

export function Login({ userName, authState, onAuthChange }) {
	return (
		<main className="d-flex justify-content-center align-items-center vh-100">
			{authState === AuthState.Authenticated ? (
				<Authenticated
					userName={userName}
					onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
				/>
			) : (
				<Unauthenticated
					userName={userName}
					onLogin={(loginUserName) => {
						onAuthChange(loginUserName, AuthState.Authenticated);
					}}
				/>
			)}
		</main>
	);
}
