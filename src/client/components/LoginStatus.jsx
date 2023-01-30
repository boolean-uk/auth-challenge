import { useEffect } from 'react';

export default function LoginStatus({ loggedIn, setLoggedIn }) {
	// useEffect(() => {
	// 	const user = localStorage.getItem('user');
	// 	if (user) {
	// 		setLoggedIn(user);
	// 	}
	// }, []);

	function logout() {
		localStorage.removeItem('accessToken');
		setLoggedIn(null);
	}

	return (
		<div onClick={logout} className="LoginStatus">
			<span>Logged in {loggedIn ? '🟢' : '🔴'}</span>
		</div>
	);
}
