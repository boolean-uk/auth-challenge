import { useEffect, useState } from 'react';

export default function LoginStatus() {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token) setLoggedIn(true);
	}, []);
	return (
		<div className="LoginStatus">
			<span>Logged in {loggedIn ? '🟢' : '🔴'}</span>
		</div>
	);
}
