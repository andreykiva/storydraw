export type Comment = {
	id: string;
	content: string;
	createdAt: string;
	likesCount: number;
	user: CommentUser;
	isLiked?: boolean;
	repliesCount?: number;
	replies?: Comment[];
};

export type CommentUser = {
	id: string;
	username: string;
	displayName: string;
	imageUrl: string;
};

export type RepliedComment = {
	id: string;
	content: string;
	user: RepliedCommentUser;
	parentCommentId: string | null;
};

export type RepliedCommentUser = {
	displayName: string;
};
