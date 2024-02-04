import type { Notification } from '@/types/Notification';

type CategorizedNotifications<T> = {
	thisWeek: T[];
	thisMonth: T[];
	previous: T[];
};

export const categorizeNotificationsByDate = <T extends Notification>(
	notifications: T[],
): CategorizedNotifications<T> => {
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();

	const thisWeek: T[] = [];
	const thisMonth: T[] = [];
	const previous: T[] = [];

	notifications.forEach((notification) => {
		const objDate = notification.date;
		const objMonth = objDate.getMonth();
		const objYear = objDate.getFullYear();

		const timeDiff = currentDate.getTime() - objDate.getTime();
		const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;

		if (timeDiff < oneWeekInMs) {
			thisWeek.push(notification);
		} else if (objYear === currentYear && objMonth === currentMonth) {
			thisMonth.push(notification);
		} else {
			previous.push(notification);
		}
	});

	thisWeek.sort((a, b) => b.date.getTime() - a.date.getTime());
	thisMonth.sort((a, b) => b.date.getTime() - a.date.getTime());
	previous.sort((a, b) => b.date.getTime() - a.date.getTime());

	return { thisWeek, thisMonth, previous };
};

export const displayDate = (date: Date): string => {
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
			return `${mm}-${dd}`;
		} else {
			return `${yyyy}-${mm}-${dd}`;
		}
	}
};
