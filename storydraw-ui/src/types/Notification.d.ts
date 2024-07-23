import type User from './User';

type ParentComment = {
	id: string;
	user: Pick<User, 'id' | 'displayName'>;
	text: string;
};

type StoryImages = {
	image: string;
};

export type CommentNotification = {
	id: string;
	type: 'comment';
	text: string;
	date: Date;
	parentComment?: ParentComment;
	story: {
		id: string;
		preview: StoryImages;
	};
	user: Pick<User, 'id' | 'username' | 'displayName' | 'imageUrl'>;
};

export type FollowNotification = {
	id: string;
	type: 'follow';
	date: Date;
	user: Pick<User, 'id' | 'username' | 'displayName' | 'imageUrl'> & {
		isFollowedByYou: boolean;
	};
};

type LikedUser = Pick<User, 'id' | 'username' | 'displayName' | 'imageUrl'>;

export type LikeNotification = {
	id: string;
	type: 'like';
	date: Date;
	parentComment?: ParentComment;
	story: {
		id: string;
		preview: StoryImages;
		author: Pick<User, 'id' | 'username'>;
	};
	user?: LikedUser;
	amount?: number;
	users?: LikedUser[];
};

export type Notification = CommentNotification | FollowNotification | LikeNotification;
