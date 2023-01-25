export default function Notification({ message, setNotification }) {
	function closeNotification() {
		setNotification('');
	}

	return (
		<div onClick={closeNotification} className="Notification">
			<span>{message}</span>
		</div>
	);
}
