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