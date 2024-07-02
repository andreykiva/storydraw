export const displayDate = (date: Date, divider: string = '-'): string => {
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (seconds < 60) {
		return `${seconds}s`;
	} else if (minutes < 60) {
		return `${minutes}m`;
	} else if (hours < 24) {
		return `${hours}h`;
	} else if (days < 30) {
		return `${days}d`;
	} else {
		const mm = String(date.getMonth() + 1).padStart(2, '0');
		const dd = String(date.getDate()).padStart(2, '0');
		const yyyy = date.getFullYear();

		if (yyyy === now.getFullYear()) {
			return `${mm}${divider}${dd}`;
		} else {
			return `${yyyy}${divider}${mm}${divider}${dd}`;
		}
	}
};
