/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AddFavoriteInput = {
  storyId: Scalars['String']['input'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  storyId: Scalars['String']['input'];
};

export type CreateDrawingInput = {
  imageUrl: Scalars['String']['input'];
  storyId: Scalars['String']['input'];
};

export type CreateReplyInput = {
  commentId: Scalars['String']['input'];
  content: Scalars['String']['input'];
};

export type CreateStoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  drawing: FirstDrawingInput;
  musicId?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type FirstDrawingInput = {
  imageUrl: Scalars['String']['input'];
};

export type FollowInput = {
  userId: Scalars['String']['input'];
};

export type GenerateEmailCodeInput = {
  email: Scalars['String']['input'];
};

export type GeneratePhoneCodeInput = {
  phone: Scalars['String']['input'];
};

export type GetCommentsCountInput = {
  storyId: Scalars['String']['input'];
};

export type GetCommentsInput = {
  storyId: Scalars['String']['input'];
};

export type GetFavoritesCountInput = {
  storyId: Scalars['String']['input'];
};

export type GetRepliesInput = {
  commentId: Scalars['String']['input'];
};

export type GetSharesCountInput = {
  storyId: Scalars['String']['input'];
};

export type GetStoryInput = {
  storyId: Scalars['String']['input'];
};

export type GetUserByUsernameInput = {
  username: Scalars['String']['input'];
};

export type GetUserFavoritesInput = {
  userId: Scalars['String']['input'];
};

export type GetUserStoriesInput = {
  userId: Scalars['String']['input'];
};

export type GetUserStoryLikesInput = {
  userId: Scalars['String']['input'];
};

export type LikeCommentInput = {
  commentId: Scalars['String']['input'];
};

export type LikeStoryInput = {
  storyId: Scalars['String']['input'];
};

export type LoginWithEmailAndPassInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginWithPhoneAndCodeInput = {
  code: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type LoginWithPhoneAndPassInput = {
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type LoginWithUsernameAndPassInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export enum NotificationType {
  Comment = 'COMMENT',
  Follow = 'FOLLOW',
  Like = 'LIKE',
  Mention = 'MENTION'
}

export type PaginationInput = {
  cursor?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: Scalars['Int']['input'];
};

export type RemoveCommentInput = {
  commentId: Scalars['String']['input'];
};

export type RepliesPaginationInput = {
  cursor?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: Scalars['Int']['input'];
};

export type ResetWithEmailInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ResetWithPhoneInput = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type ShareInput = {
  storyId: Scalars['String']['input'];
};

export type SignupWithEmailAndPassAndCodeInput = {
  code: Scalars['String']['input'];
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  receiveEmailUpdates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SignupWithPhoneAndCodeInput = {
  code: Scalars['String']['input'];
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  phone: Scalars['String']['input'];
};

export type UpdateUserInput = {
  bio: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UpdateUsernameInput = {
  username: Scalars['String']['input'];
};

export type AuthResponseFragmentFragment = { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } };

export type GenerateCodeResponseFragmentFragment = { __typename?: 'GenerateCodeResponse', success: boolean, message: string };

export type GeneratePhoneCodeForSignupMutationVariables = Exact<{
  generateCodeInput: GeneratePhoneCodeInput;
}>;


export type GeneratePhoneCodeForSignupMutation = { __typename?: 'Mutation', generatePhoneCodeForSignup: { __typename?: 'GenerateCodeResponse', success: boolean, message: string } };

export type GenerateEmailCodeForSignupMutationVariables = Exact<{
  generateCodeInput: GenerateEmailCodeInput;
}>;


export type GenerateEmailCodeForSignupMutation = { __typename?: 'Mutation', generateEmailCodeForSignup: { __typename?: 'GenerateCodeResponse', success: boolean, message: string } };

export type SignupWithPhoneAndCodeMutationVariables = Exact<{
  signupInput: SignupWithPhoneAndCodeInput;
}>;


export type SignupWithPhoneAndCodeMutation = { __typename?: 'Mutation', signupWithPhoneAndCode: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } } };

export type SignupWithEmailAndPassAndCodeMutationVariables = Exact<{
  signupInput: SignupWithEmailAndPassAndCodeInput;
}>;


export type SignupWithEmailAndPassAndCodeMutation = { __typename?: 'Mutation', signupWithEmailAndPassAndCode: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } } };

export type GeneratePhoneCodeForLoginMutationVariables = Exact<{
  generateCodeInput: GeneratePhoneCodeInput;
}>;


export type GeneratePhoneCodeForLoginMutation = { __typename?: 'Mutation', generatePhoneCodeForLogin: { __typename?: 'GenerateCodeResponse', success: boolean, message: string } };

export type LoginWithPhoneAndCodeMutationVariables = Exact<{
  loginInput: LoginWithPhoneAndCodeInput;
}>;


export type LoginWithPhoneAndCodeMutation = { __typename?: 'Mutation', loginWithPhoneAndCode: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } } };

export type LoginWithPhoneAndPassMutationVariables = Exact<{
  loginInput: LoginWithPhoneAndPassInput;
}>;


export type LoginWithPhoneAndPassMutation = { __typename?: 'Mutation', loginWithPhoneAndPass: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } } };

export type LoginWithEmailAndPassMutationVariables = Exact<{
  loginInput: LoginWithEmailAndPassInput;
}>;


export type LoginWithEmailAndPassMutation = { __typename?: 'Mutation', loginWithEmailAndPass: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } } };

export type LoginWithUsernameAndPassMutationVariables = Exact<{
  loginInput: LoginWithUsernameAndPassInput;
}>;


export type LoginWithUsernameAndPassMutation = { __typename?: 'Mutation', loginWithUsernameAndPass: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } } };

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'RefreshTokenResponse', access_token: string } };

export type GeneratePhoneCodeForResetMutationVariables = Exact<{
  generateCodeInput: GeneratePhoneCodeInput;
}>;


export type GeneratePhoneCodeForResetMutation = { __typename?: 'Mutation', generatePhoneCodeForReset: { __typename?: 'GenerateCodeResponse', success: boolean, message: string } };

export type GenerateEmailCodeForResetMutationVariables = Exact<{
  generateCodeInput: GenerateEmailCodeInput;
}>;


export type GenerateEmailCodeForResetMutation = { __typename?: 'Mutation', generateEmailCodeForReset: { __typename?: 'GenerateCodeResponse', success: boolean, message: string } };

export type ResetPasswordWithPhoneMutationVariables = Exact<{
  resetPasswordInput: ResetWithPhoneInput;
}>;


export type ResetPasswordWithPhoneMutation = { __typename?: 'Mutation', resetPasswordWithPhone: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } } };

export type ResetPasswordWithEmailMutationVariables = Exact<{
  resetPasswordInput: ResetWithEmailInput;
}>;


export type ResetPasswordWithEmailMutation = { __typename?: 'Mutation', resetPasswordWithEmail: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } } };

export type LikeCommentMutationVariables = Exact<{
  likeCommentInput: LikeCommentInput;
}>;


export type LikeCommentMutation = { __typename?: 'Mutation', likeComment: { __typename?: 'Like', id: string } };

export type UnlikeCommentMutationVariables = Exact<{
  unlikeCommentInput: LikeCommentInput;
}>;


export type UnlikeCommentMutation = { __typename?: 'Mutation', unlikeComment: { __typename?: 'UnlikeResponse', success: boolean } };

export type CreateCommentMutationVariables = Exact<{
  createCommentInput: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, content: string, createdAt: any, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } } };

export type CreateReplyMutationVariables = Exact<{
  createReplyInput: CreateReplyInput;
}>;


export type CreateReplyMutation = { __typename?: 'Mutation', createReply: { __typename?: 'Comment', id: string, content: string, createdAt: any, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } } };

export type RemoveCommentMutationVariables = Exact<{
  removeCommentInput: RemoveCommentInput;
}>;


export type RemoveCommentMutation = { __typename?: 'Mutation', removeComment: { __typename?: 'RemoveCommentResponse', success: boolean } };

export type GetCommentsQueryVariables = Exact<{
  getCommentsInput: GetCommentsInput;
  paginationInput?: InputMaybe<PaginationInput>;
  isAuth: Scalars['Boolean']['input'];
}>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, likesCount: number, repliesCount: number, isLiked?: boolean, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } }> };

export type GetRepliesQueryVariables = Exact<{
  getRepliesInput: GetRepliesInput;
  paginationInput?: InputMaybe<RepliesPaginationInput>;
  isAuth: Scalars['Boolean']['input'];
}>;


export type GetRepliesQuery = { __typename?: 'Query', getReplies: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, likesCount: number, isLiked?: boolean, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } }> };

export type UpdateLastNotificationsViewedMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateLastNotificationsViewedMutation = { __typename?: 'Mutation', updateLastNotificationsViewed: { __typename?: 'UpdateLastViewedDateResponse', success: boolean } };

export type GetLikesNotificationsQueryVariables = Exact<{
  paginationInput?: InputMaybe<PaginationInput>;
}>;


export type GetLikesNotificationsQuery = { __typename?: 'Query', getLikesNotifications?: Array<{ __typename?: 'LikeNotification', id: string, type: NotificationType, createdAt: any, story: { __typename?: 'Story', id: string, user: { __typename?: 'User', username: string } }, initiator: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null }, like: { __typename?: 'Like', comment?: { __typename?: 'Comment', content: string } | null } }> | null };

export type GetCommentsNotificationsQueryVariables = Exact<{
  paginationInput?: InputMaybe<PaginationInput>;
}>;


export type GetCommentsNotificationsQuery = { __typename?: 'Query', getCommentsNotifications?: Array<{ __typename?: 'CommentNotification', id: string, type: NotificationType, createdAt: any, story: { __typename?: 'Story', id: string, user: { __typename?: 'User', username: string } }, initiator: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null }, comment?: { __typename?: 'Comment', content: string, parentComment?: { __typename?: 'Comment', content: string, user: { __typename?: 'User', id: string } } | null, parentReply?: { __typename?: 'Comment', content: string, user: { __typename?: 'User', id: string } } | null } | null }> | null };

export type GetMentionsNotificationsQueryVariables = Exact<{
  paginationInput?: InputMaybe<PaginationInput>;
}>;


export type GetMentionsNotificationsQuery = { __typename?: 'Query', getMentionsNotifications?: Array<{ __typename?: 'MentionNotification', id: string, type: NotificationType, createdAt: any, story: { __typename?: 'Story', id: string, description: string, user: { __typename?: 'User', username: string } }, initiator: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null }, comment?: { __typename?: 'Comment', content: string } | null }> | null };

export type GetFollowsNotificationsQueryVariables = Exact<{
  paginationInput?: InputMaybe<PaginationInput>;
}>;


export type GetFollowsNotificationsQuery = { __typename?: 'Query', getFollowsNotifications?: Array<{ __typename?: 'FollowNotification', id: string, type: NotificationType, createdAt: any, initiator: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null, isFollowing: boolean } }> | null };

export type GetAllNotificationsQueryVariables = Exact<{
  paginationInput?: InputMaybe<PaginationInput>;
}>;


export type GetAllNotificationsQuery = { __typename?: 'Query', getAllNotifications?: Array<{ __typename?: 'CommentNotification', id: string, type: NotificationType, createdAt: any, story: { __typename?: 'Story', id: string, user: { __typename?: 'User', username: string } }, initiator: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null }, comment?: { __typename?: 'Comment', content: string, parentComment?: { __typename?: 'Comment', content: string, user: { __typename?: 'User', id: string } } | null, parentReply?: { __typename?: 'Comment', content: string, user: { __typename?: 'User', id: string } } | null } | null } | { __typename?: 'FollowNotification', id: string, type: NotificationType, createdAt: any, initiator: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null, isFollowing: boolean } } | { __typename?: 'LikeNotification', id: string, type: NotificationType, createdAt: any, story: { __typename?: 'Story', id: string, user: { __typename?: 'User', username: string } }, initiator: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null }, like: { __typename?: 'Like', comment?: { __typename?: 'Comment', content: string } | null } } | { __typename?: 'MentionNotification', id: string, type: NotificationType, createdAt: any, story: { __typename?: 'Story', id: string, description: string, user: { __typename?: 'User', username: string } }, initiator: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null }, comment?: { __typename?: 'Comment', content: string } | null }> | null };

export type GetNewNotificationsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewNotificationsCountQuery = { __typename?: 'Query', getNewNotificationsCount: number };

export type NnewNotificationsCountSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NnewNotificationsCountSubscriptionSubscription = { __typename?: 'Subscription', newNotificationsCountUpdated: { __typename?: 'NotificationsCountSubscribe', count: number } };

export type CreateStoryMutationVariables = Exact<{
  createStoryInput: CreateStoryInput;
}>;


export type CreateStoryMutation = { __typename?: 'Mutation', createStory: { __typename?: 'Story', id: string, title: string } };

export type LikeStoryMutationVariables = Exact<{
  likeStoryInput: LikeStoryInput;
}>;


export type LikeStoryMutation = { __typename?: 'Mutation', likeStory: { __typename?: 'Like', id: string } };

export type UnlikeStoryMutationVariables = Exact<{
  unlikeStoryInput: LikeStoryInput;
}>;


export type UnlikeStoryMutation = { __typename?: 'Mutation', unlikeStory: { __typename?: 'UnlikeResponse', success: boolean } };

export type AddFavoriteMutationVariables = Exact<{
  addFavoriteInput: AddFavoriteInput;
}>;


export type AddFavoriteMutation = { __typename?: 'Mutation', addFavorite: { __typename?: 'Favorite', id: string } };

export type RemoveFavoriteMutationVariables = Exact<{
  removeFavoriteInput: AddFavoriteInput;
}>;


export type RemoveFavoriteMutation = { __typename?: 'Mutation', removeFavorite: { __typename?: 'RemoveFavoriteResponse', success: boolean } };

export type ShareMutationVariables = Exact<{
  shareInput: ShareInput;
}>;


export type ShareMutation = { __typename?: 'Mutation', share: { __typename?: 'Share', id: string } };

export type GetFeedQueryVariables = Exact<{
  paginationInput?: InputMaybe<PaginationInput>;
  isAuth: Scalars['Boolean']['input'];
}>;


export type GetFeedQuery = { __typename?: 'Query', getAllStories: Array<{ __typename?: 'Story', id: string, title: string, description: string, createdAt: any, musicId?: string | null, likesCount: number, commentsCount: number, favoritesCount: number, sharesCount: number, isLiked?: boolean, isFavorited?: boolean, isShared?: boolean, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null, isFollowing?: boolean, isFollowedBy?: boolean } }> };

export type GetStoryQueryVariables = Exact<{
  getStoryInput: GetStoryInput;
  isAuth: Scalars['Boolean']['input'];
}>;


export type GetStoryQuery = { __typename?: 'Query', getStory?: { __typename?: 'Story', id: string, title: string, description: string, createdAt: any, likesCount: number, commentsCount: number, favoritesCount: number, sharesCount: number, isLiked?: boolean, isFavorited?: boolean, isShared?: boolean, user: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null, isFollowing?: boolean, isFollowedBy?: boolean } } | null };

export type GetUserStoriesQueryVariables = Exact<{
  getUserStoriesInput: GetUserStoriesInput;
  paginationInput?: InputMaybe<PaginationInput>;
}>;


export type GetUserStoriesQuery = { __typename?: 'Query', getUserStories: Array<{ __typename?: 'Story', id: string, description: string, createdAt: any }> };

export type GetUserFavoritesQueryVariables = Exact<{
  getUserFavoritesInput: GetUserFavoritesInput;
  paginationInput?: InputMaybe<PaginationInput>;
}>;


export type GetUserFavoritesQuery = { __typename?: 'Query', getUserFavorites: Array<{ __typename?: 'Favorite', createdAt: any, story: { __typename?: 'Story', id: string, description: string } }> };

export type GetUserStoryLikesQueryVariables = Exact<{
  getUserStoryLikesInput: GetUserStoryLikesInput;
  paginationInput?: InputMaybe<PaginationInput>;
}>;


export type GetUserStoryLikesQuery = { __typename?: 'Query', getUserStoryLikes: Array<{ __typename?: 'Like', createdAt: any, story?: { __typename?: 'Story', id: string, description: string } | null }> };

export type UpdateUsernameMutationVariables = Exact<{
  usernameInput: UpdateUsernameInput;
}>;


export type UpdateUsernameMutation = { __typename?: 'Mutation', updateUsername: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } };

export type FollowMutationVariables = Exact<{
  followInput: FollowInput;
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: { __typename?: 'Follow', id: string } };

export type UnfollowMutationVariables = Exact<{
  unfollowInput: FollowInput;
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow: { __typename?: 'UnfollowResponse', success: boolean } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null, bio: string } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } };

export type EnsureUsernameNotExistsQueryVariables = Exact<{
  usernameInput: GetUserByUsernameInput;
}>;


export type EnsureUsernameNotExistsQuery = { __typename?: 'Query', ensureUsernameNotExists: { __typename?: 'UserExistsResponse', exists: boolean } };

export type GetUserProfileQueryVariables = Exact<{
  usernameInput: GetUserByUsernameInput;
  isAuth: Scalars['Boolean']['input'];
  isCurrentUser: Scalars['Boolean']['input'];
}>;


export type GetUserProfileQuery = { __typename?: 'Query', getUserByUsername?: { __typename?: 'User', id: string, username: string, displayName: string, bio: string, imageUrl?: string | null, followingCount: number, followersCount: number, friendsCount?: number, likesCount: number, isFollowedBy?: boolean, isFollowing?: boolean } | null };

export type GetFollowingQueryVariables = Exact<{
  getFollowingInput: FollowInput;
  paginationInput?: InputMaybe<PaginationInput>;
  isAuth: Scalars['Boolean']['input'];
}>;


export type GetFollowingQuery = { __typename?: 'Query', getFollowing: Array<{ __typename?: 'Follow', createdAt: any, following: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null, isFollowing?: boolean, isFollowedBy?: boolean } }> };

export type GetFollowersQueryVariables = Exact<{
  getFollowersInput: FollowInput;
  paginationInput?: InputMaybe<PaginationInput>;
  isAuth: Scalars['Boolean']['input'];
}>;


export type GetFollowersQuery = { __typename?: 'Query', getFollowers: Array<{ __typename?: 'Follow', createdAt: any, follower: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null, isFollowing?: boolean, isFollowedBy?: boolean } }> };

export type GetFriendsQueryVariables = Exact<{
  paginationInput?: InputMaybe<PaginationInput>;
}>;


export type GetFriendsQuery = { __typename?: 'Query', getFriends: Array<{ __typename?: 'Follow', createdAt: any, following: { __typename?: 'User', id: string, username: string, displayName: string, imageUrl?: string | null } }> };

export const AuthResponseFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<AuthResponseFragmentFragment, unknown>;
export const GenerateCodeResponseFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GenerateCodeResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateCodeResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<GenerateCodeResponseFragmentFragment, unknown>;
export const GeneratePhoneCodeForSignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GeneratePhoneCodeForSignup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generateCodeInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GeneratePhoneCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generatePhoneCodeForSignup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"generateCodeInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generateCodeInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GenerateCodeResponseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GenerateCodeResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateCodeResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<GeneratePhoneCodeForSignupMutation, GeneratePhoneCodeForSignupMutationVariables>;
export const GenerateEmailCodeForSignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateEmailCodeForSignup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generateCodeInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateEmailCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateEmailCodeForSignup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"generateCodeInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generateCodeInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GenerateCodeResponseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GenerateCodeResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateCodeResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<GenerateEmailCodeForSignupMutation, GenerateEmailCodeForSignupMutationVariables>;
export const SignupWithPhoneAndCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupWithPhoneAndCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signupInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupWithPhoneAndCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupWithPhoneAndCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signupInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signupInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<SignupWithPhoneAndCodeMutation, SignupWithPhoneAndCodeMutationVariables>;
export const SignupWithEmailAndPassAndCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupWithEmailAndPassAndCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signupInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupWithEmailAndPassAndCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupWithEmailAndPassAndCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signupInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signupInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<SignupWithEmailAndPassAndCodeMutation, SignupWithEmailAndPassAndCodeMutationVariables>;
export const GeneratePhoneCodeForLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GeneratePhoneCodeForLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generateCodeInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GeneratePhoneCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generatePhoneCodeForLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"generateCodeInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generateCodeInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GenerateCodeResponseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GenerateCodeResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateCodeResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<GeneratePhoneCodeForLoginMutation, GeneratePhoneCodeForLoginMutationVariables>;
export const LoginWithPhoneAndCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginWithPhoneAndCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginWithPhoneAndCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWithPhoneAndCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<LoginWithPhoneAndCodeMutation, LoginWithPhoneAndCodeMutationVariables>;
export const LoginWithPhoneAndPassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginWithPhoneAndPass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginWithPhoneAndPassInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWithPhoneAndPass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<LoginWithPhoneAndPassMutation, LoginWithPhoneAndPassMutationVariables>;
export const LoginWithEmailAndPassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginWithEmailAndPass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginWithEmailAndPassInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWithEmailAndPass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<LoginWithEmailAndPassMutation, LoginWithEmailAndPassMutationVariables>;
export const LoginWithUsernameAndPassDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginWithUsernameAndPass"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginWithUsernameAndPassInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginWithUsernameAndPass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<LoginWithUsernameAndPassMutation, LoginWithUsernameAndPassMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const GeneratePhoneCodeForResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GeneratePhoneCodeForReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generateCodeInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GeneratePhoneCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generatePhoneCodeForReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"generateCodeInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generateCodeInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GenerateCodeResponseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GenerateCodeResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateCodeResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<GeneratePhoneCodeForResetMutation, GeneratePhoneCodeForResetMutationVariables>;
export const GenerateEmailCodeForResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateEmailCodeForReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generateCodeInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateEmailCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateEmailCodeForReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"generateCodeInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generateCodeInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GenerateCodeResponseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GenerateCodeResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateCodeResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<GenerateEmailCodeForResetMutation, GenerateEmailCodeForResetMutationVariables>;
export const ResetPasswordWithPhoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPasswordWithPhone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetWithPhoneInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPasswordWithPhone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resetPasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordWithPhoneMutation, ResetPasswordWithPhoneMutationVariables>;
export const ResetPasswordWithEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPasswordWithEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetWithEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPasswordWithEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resetPasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resetPasswordInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthResponseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthResponseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordWithEmailMutation, ResetPasswordWithEmailMutationVariables>;
export const LikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"likeCommentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LikeCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"likeCommentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"likeCommentInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LikeCommentMutation, LikeCommentMutationVariables>;
export const UnlikeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlikeComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unlikeCommentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LikeCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"unlikeCommentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unlikeCommentInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UnlikeCommentMutation, UnlikeCommentMutationVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCommentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCommentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCommentInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateReplyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReply"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createReplyInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateReplyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReply"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createReplyInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createReplyInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<CreateReplyMutation, CreateReplyMutationVariables>;
export const RemoveCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeCommentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"removeCommentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeCommentInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RemoveCommentMutation, RemoveCommentMutationVariables>;
export const GetCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getCommentsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetCommentsInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getCommentsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getCommentsInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"repliesCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]}]}}]}}]} as unknown as DocumentNode<GetCommentsQuery, GetCommentsQueryVariables>;
export const GetRepliesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReplies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getRepliesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetRepliesInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RepliesPaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getReplies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getRepliesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getRepliesInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]}]}}]}}]} as unknown as DocumentNode<GetRepliesQuery, GetRepliesQueryVariables>;
export const UpdateLastNotificationsViewedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLastNotificationsViewed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLastNotificationsViewed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UpdateLastNotificationsViewedMutation, UpdateLastNotificationsViewedMutationVariables>;
export const GetLikesNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLikesNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLikesNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"initiator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"like"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetLikesNotificationsQuery, GetLikesNotificationsQueryVariables>;
export const GetCommentsNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCommentsNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCommentsNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"initiator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCommentsNotificationsQuery, GetCommentsNotificationsQueryVariables>;
export const GetMentionsNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMentionsNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMentionsNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"initiator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]} as unknown as DocumentNode<GetMentionsNotificationsQuery, GetMentionsNotificationsQueryVariables>;
export const GetFollowsNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowsNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFollowsNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"initiator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}}]}}]}}]}}]} as unknown as DocumentNode<GetFollowsNotificationsQuery, GetFollowsNotificationsQueryVariables>;
export const GetAllNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LikeNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"initiator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"like"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommentNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"initiator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentReply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MentionNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"initiator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowNotification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"initiator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllNotificationsQuery, GetAllNotificationsQueryVariables>;
export const GetNewNotificationsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNewNotificationsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNewNotificationsCount"}}]}}]} as unknown as DocumentNode<GetNewNotificationsCountQuery, GetNewNotificationsCountQueryVariables>;
export const NnewNotificationsCountSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NnewNotificationsCountSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newNotificationsCountUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<NnewNotificationsCountSubscriptionSubscription, NnewNotificationsCountSubscriptionSubscriptionVariables>;
export const CreateStoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createStoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createStoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createStoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateStoryMutation, CreateStoryMutationVariables>;
export const LikeStoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeStory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"likeStoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LikeStoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"likeStoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"likeStoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LikeStoryMutation, LikeStoryMutationVariables>;
export const UnlikeStoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlikeStory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unlikeStoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LikeStoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikeStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"unlikeStoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unlikeStoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UnlikeStoryMutation, UnlikeStoryMutationVariables>;
export const AddFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addFavoriteInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddFavoriteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"addFavoriteInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addFavoriteInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddFavoriteMutation, AddFavoriteMutationVariables>;
export const RemoveFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeFavoriteInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddFavoriteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"removeFavoriteInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeFavoriteInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RemoveFavoriteMutation, RemoveFavoriteMutationVariables>;
export const ShareDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Share"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shareInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ShareInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"share"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"shareInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shareInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ShareMutation, ShareMutationVariables>;
export const GetFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllStories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"musicId"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"favoritesCount"}},{"kind":"Field","name":{"kind":"Name","value":"sharesCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]},{"kind":"Field","name":{"kind":"Name","value":"isFollowedBy"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]}]}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]},{"kind":"Field","name":{"kind":"Name","value":"isFavorited"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]},{"kind":"Field","name":{"kind":"Name","value":"isShared"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]}]}}]}}]} as unknown as DocumentNode<GetFeedQuery, GetFeedQueryVariables>;
export const GetStoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getStoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetStoryInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getStoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getStoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"favoritesCount"}},{"kind":"Field","name":{"kind":"Name","value":"sharesCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]},{"kind":"Field","name":{"kind":"Name","value":"isFollowedBy"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]}]}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]},{"kind":"Field","name":{"kind":"Name","value":"isFavorited"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]},{"kind":"Field","name":{"kind":"Name","value":"isShared"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]}]}}]}}]} as unknown as DocumentNode<GetStoryQuery, GetStoryQueryVariables>;
export const GetUserStoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserStories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getUserStoriesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetUserStoriesInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserStories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getUserStoriesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getUserStoriesInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetUserStoriesQuery, GetUserStoriesQueryVariables>;
export const GetUserFavoritesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserFavorites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getUserFavoritesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetUserFavoritesInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserFavorites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getUserFavoritesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getUserFavoritesInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserFavoritesQuery, GetUserFavoritesQueryVariables>;
export const GetUserStoryLikesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserStoryLikes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getUserStoryLikesInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetUserStoryLikesInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserStoryLikes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getUserStoryLikesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getUserStoryLikesInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"story"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserStoryLikesQuery, GetUserStoryLikesQueryVariables>;
export const UpdateUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usernameInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUsernameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"usernameInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usernameInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<UpdateUsernameMutation, UpdateUsernameMutationVariables>;
export const FollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Follow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FollowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"followInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FollowMutation, FollowMutationVariables>;
export const UnfollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Unfollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"unfollowInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FollowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unfollow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"unfollowInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"unfollowInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UnfollowMutation, UnfollowMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const EnsureUsernameNotExistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EnsureUsernameNotExists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usernameInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetUserByUsernameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ensureUsernameNotExists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"usernameInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usernameInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exists"}}]}}]}}]} as unknown as DocumentNode<EnsureUsernameNotExistsQuery, EnsureUsernameNotExistsQueryVariables>;
export const GetUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usernameInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetUserByUsernameInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isCurrentUser"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserByUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"usernameInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usernameInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"friendsCount"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isCurrentUser"}}}]}]},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowedBy"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]}]}}]}}]} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const GetFollowingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getFollowingInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FollowInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFollowing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getFollowingInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getFollowingInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]},{"kind":"Field","name":{"kind":"Name","value":"isFollowedBy"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]}]}}]}}]}}]} as unknown as DocumentNode<GetFollowingQuery, GetFollowingQueryVariables>;
export const GetFollowersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getFollowersInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FollowInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFollowers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"getFollowersInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getFollowersInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]},{"kind":"Field","name":{"kind":"Name","value":"isFollowedBy"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAuth"}}}]}]}]}}]}}]}}]} as unknown as DocumentNode<GetFollowersQuery, GetFollowersQueryVariables>;
export const GetFriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFriends"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFriends"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paginationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetFriendsQuery, GetFriendsQueryVariables>;