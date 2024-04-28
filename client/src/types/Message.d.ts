import type User from './User';

export type MessageLikes = {
	amount: number;
	users: Pick<User, 'id' | 'image'>[];
};

export type Message = {
	id: string;
	author: Pick<User, 'id' | 'image' | 'username'>;
	text: string;
	date: string;
	likes: MessageLikes;
};
