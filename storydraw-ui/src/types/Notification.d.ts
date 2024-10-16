import type User from './User';
import type { Comment as CommentType } from './Comment';
import { NotificationType } from '@/__generated__/graphql';

type NotificationInitiator = Pick<User, 'id' | 'username' | 'displayName' | 'imageUrl'>;

type Story = {
	id: string;
	description?: string;
	user: Pick<User, 'username'>;
};

type Like = {
	comment?: Pick<CommentType, 'content'>;
};

type ParentComment = {
	content: string;
	user: Pick<User, 'id'>;
};

type Comment = {
	content: string;
	parentComment?: ParentComment;
	parentReply?: ParentComment;
};

export type LikeNotification = {
	id: string;
	type: NotificationType;
	createdAt: string;
	initiator: NotificationInitiator;
	like: Like;
	story: Story;
};

export type CommentNotification = {
	id: string;
	type: NotificationType;
	createdAt: string;
	initiator: NotificationInitiator;
	comment?: Comment;
	story: Story;
};

export type MentionNotification = {
	id: string;
	type: NotificationType;
	createdAt: string;
	initiator: NotificationInitiator;
	comment?: Comment;
	story: Story;
};

export type FollowNotification = {
	id: string;
	type: NotificationType;
	createdAt: string;
	initiator: NotificationInitiator & {
		isFollowing: boolean;
	};
};

export type Notification = LikeNotification | CommentNotification | MentionNotification | FollowNotification;
