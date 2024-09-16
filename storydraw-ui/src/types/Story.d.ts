import User from './User';

export type Story = {
	id: string;
	title: string;
	description?: string;
	musicId?: string;
	createdAt: string;
	likesCount?: number;
	viewsCount?: number;
	commentsCount?: number;
	favoritesCount?: number;
	sharesCount?: number;
};

type ForYouStoryUser = Pick<User, 'id' | 'username' | 'displayName' | 'imageUrl' | 'isFollowedBy' | 'isFollowing'>;

export type ForYouStory = {
	id: string;
	title: string;
	description?: string;
	musicId?: string;
	createdAt: string;
	likesCount: number;
	commentsCount: number;
	favoritesCount: number;
	sharesCount: number;
	user: ForYouStoryUser;

	isLiked?: boolean;
	isFavorited?: boolean;
	isShared?: boolean;
};
