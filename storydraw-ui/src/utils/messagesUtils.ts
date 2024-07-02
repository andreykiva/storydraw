import type { Message } from '@/types/Message';

export const splitMessagesByDate = (messages: Message[]) => {
	const messagesByDate: { [date: string]: Message[] } = {};

	messages.forEach((message) => {
		const messageDate = new Date(message.date).toDateString();

		if (!messagesByDate[messageDate]) {
			messagesByDate[messageDate] = [];
		}

		messagesByDate[messageDate].push(message);
	});

	return messagesByDate;
};
