import { useEffect, useState } from 'react';

export default function LoginStatus({ loggedIn, setLoggedIn }) {
	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token) setLoggedIn(true);
	}, []);

	function logout() {
		localStorage.removeItem('accessToken');
		setLoggedIn(false);
	}

	return (
		<div onClick={logout} className="LoginStatus">
			<span>Logged in {loggedIn ? '🟢' : '🔴'}</span>
		</div>
	);
}
