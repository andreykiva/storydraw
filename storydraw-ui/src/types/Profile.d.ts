import type { Story } from '@/types/Story';

export type ProfileStory = Pick<Story, 'id' | 'description' | 'createdAt'>;

export type UserStoryLike = {
	createdAt: string;
	story?: Pick<Story, 'id' | 'description'>;
};
export type UserFavorite = {
	createdAt: string;
	story: Pick<Story, 'id' | 'description'>;
};

export type ProfileUser = {
	id: string;
	username: string;
	displayName: string;
	bio: string;
	imageUrl?: string;
	followersCount: number;
	followingCount: number;
	friendsCount?: number;
	likesCount: number;
	isFollowedBy?: boolean;
	isFollowing?: boolean;
};

export type RelationsUser = {
	id: string;
	username: string;
	displayName: string;
	imageUrl?: string;
	isFollowedBy?: boolean;
	isFollowing?: boolean;
};

export type RelationsFollower = {
	createdAt: string;
	follower: RelationsUser;
};

export type RelationsFollowing = {
	createdAt: string;
	following: RelationsUser;
};
