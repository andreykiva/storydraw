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
		const objDate = new Date(notification.createdAt);
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

	thisWeek.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	thisMonth.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	previous.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	return { thisWeek, thisMonth, previous };
};