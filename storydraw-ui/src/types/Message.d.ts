import type User from './User';

export type MessageLikes = {
	amount: number;
	users: Pick<User, 'id' | 'imageUrl'>[];
};

export type Message = {
	id: string;
	author: Pick<User, 'id' | 'imageUrl' | 'username'>;
	text: string;
	date: string;
	likes: MessageLikes;
};
