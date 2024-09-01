import type { Story } from '@/types/Story';

export type ProfileStory = Pick<Story, 'id' | 'description'>;

export type ProfileUser = {
	id: string;
	username: string;
	displayName: string;
	bio: string;
	imageUrl: string;
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
	imageUrl: string;
	isFollowedBy?: boolean;
	isFollowing?: boolean;
};
