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
  DateTime: { input: any; output: any; }
};

export type AddFavoriteInput = {
  storyId: Scalars['String']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isLiked: Scalars['Boolean']['output'];
  likesCount: Scalars['Float']['output'];
  parentComment?: Maybe<Comment>;
  parentReply?: Maybe<Comment>;
  repliesCount: Scalars['Float']['output'];
  story: Story;
  user: User;
};

export type CommentNotification = {
  __typename?: 'CommentNotification';
  comment?: Maybe<Comment>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  initiator: User;
  story: Story;
  type: NotificationType;
};

export type CommentsCountResponse = {
  __typename?: 'CommentsCountResponse';
  count: Scalars['Float']['output'];
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

export type Drawing = {
  __typename?: 'Drawing';
  id: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  user: User;
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  story: Story;
  user: User;
};

export type FavoritesCountResponse = {
  __typename?: 'FavoritesCountResponse';
  count: Scalars['Float']['output'];
};

export type FirstDrawingInput = {
  imageUrl: Scalars['String']['input'];
};

export type Follow = {
  __typename?: 'Follow';
  createdAt: Scalars['DateTime']['output'];
  follower: User;
  following: User;
  id: Scalars['String']['output'];
  notification?: Maybe<Notification>;
};

export type FollowInput = {
  userId: Scalars['String']['input'];
};

export type FollowNotification = {
  __typename?: 'FollowNotification';
  createdAt: Scalars['DateTime']['output'];
  follow: Follow;
  id: Scalars['String']['output'];
  initiator: User;
  type: NotificationType;
};

export type FollowsCountResponse = {
  __typename?: 'FollowsCountResponse';
  count: Scalars['Float']['output'];
};

export type GenerateCodeResponse = {
  __typename?: 'GenerateCodeResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
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

export type Like = {
  __typename?: 'Like';
  comment?: Maybe<Comment>;
  createdAt: Scalars['DateTime']['output'];
  entityType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  story?: Maybe<Story>;
  user: User;
};

export type LikeCommentInput = {
  commentId: Scalars['String']['input'];
};

export type LikeNotification = {
  __typename?: 'LikeNotification';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  initiator: User;
  like: Like;
  story: Story;
  type: NotificationType;
};

export type LikeStoryInput = {
  storyId: Scalars['String']['input'];
};

export type LikesCountResponse = {
  __typename?: 'LikesCountResponse';
  count: Scalars['Float']['output'];
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

export type MentionNotification = {
  __typename?: 'MentionNotification';
  comment?: Maybe<Comment>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  initiator: User;
  story: Story;
  type: NotificationType;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavorite: Favorite;
  createComment: Comment;
  createDrawing: Drawing;
  createReply: Comment;
  createStory: Story;
  follow: Follow;
  generateEmailCodeForReset: GenerateCodeResponse;
  generateEmailCodeForSignup: GenerateCodeResponse;
  generatePhoneCodeForLogin: GenerateCodeResponse;
  generatePhoneCodeForReset: GenerateCodeResponse;
  generatePhoneCodeForSignup: GenerateCodeResponse;
  likeComment: Like;
  likeStory: Like;
  loginWithEmailAndPass: AuthResponse;
  loginWithPhoneAndCode: AuthResponse;
  loginWithPhoneAndPass: AuthResponse;
  loginWithUsernameAndPass: AuthResponse;
  refreshToken: RefreshTokenResponse;
  removeComment: RemoveCommentResponse;
  removeFavorite: RemoveFavoriteResponse;
  resetPasswordWithEmail: AuthResponse;
  resetPasswordWithPhone: AuthResponse;
  share: Share;
  signupWithEmailAndPassAndCode: AuthResponse;
  signupWithPhoneAndCode: AuthResponse;
  unfollow: UnfollowResponse;
  unlikeComment: UnlikeResponse;
  unlikeStory: UnlikeResponse;
  updateLastNotificationsViewed: UpdateLastViewedDateResponse;
  updateUser: User;
  updateUsername: User;
};


export type MutationAddFavoriteArgs = {
  addFavoriteInput: AddFavoriteInput;
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreateDrawingArgs = {
  createDrawingInput: CreateDrawingInput;
};


export type MutationCreateReplyArgs = {
  createReplyInput: CreateReplyInput;
};


export type MutationCreateStoryArgs = {
  createStoryInput: CreateStoryInput;
};


export type MutationFollowArgs = {
  followInput: FollowInput;
};


export type MutationGenerateEmailCodeForResetArgs = {
  generateCodeInput: GenerateEmailCodeInput;
};


export type MutationGenerateEmailCodeForSignupArgs = {
  generateCodeInput: GenerateEmailCodeInput;
};


export type MutationGeneratePhoneCodeForLoginArgs = {
  generateCodeInput: GeneratePhoneCodeInput;
};


export type MutationGeneratePhoneCodeForResetArgs = {
  generateCodeInput: GeneratePhoneCodeInput;
};


export type MutationGeneratePhoneCodeForSignupArgs = {
  generateCodeInput: GeneratePhoneCodeInput;
};


export type MutationLikeCommentArgs = {
  likeCommentInput: LikeCommentInput;
};


export type MutationLikeStoryArgs = {
  likeStoryInput: LikeStoryInput;
};


export type MutationLoginWithEmailAndPassArgs = {
  loginInput: LoginWithEmailAndPassInput;
};


export type MutationLoginWithPhoneAndCodeArgs = {
  loginInput: LoginWithPhoneAndCodeInput;
};


export type MutationLoginWithPhoneAndPassArgs = {
  loginInput: LoginWithPhoneAndPassInput;
};


export type MutationLoginWithUsernameAndPassArgs = {
  loginInput: LoginWithUsernameAndPassInput;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationRemoveCommentArgs = {
  removeCommentInput: RemoveCommentInput;
};


export type MutationRemoveFavoriteArgs = {
  removeFavoriteInput: AddFavoriteInput;
};


export type MutationResetPasswordWithEmailArgs = {
  resetPasswordInput: ResetWithEmailInput;
};


export type MutationResetPasswordWithPhoneArgs = {
  resetPasswordInput: ResetWithPhoneInput;
};


export type MutationShareArgs = {
  shareInput: ShareInput;
};


export type MutationSignupWithEmailAndPassAndCodeArgs = {
  signupInput: SignupWithEmailAndPassAndCodeInput;
};


export type MutationSignupWithPhoneAndCodeArgs = {
  signupInput: SignupWithPhoneAndCodeInput;
};


export type MutationUnfollowArgs = {
  unfollowInput: FollowInput;
};


export type MutationUnlikeCommentArgs = {
  unlikeCommentInput: LikeCommentInput;
};


export type MutationUnlikeStoryArgs = {
  unlikeStoryInput: LikeStoryInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateUsernameArgs = {
  usernameInput: UpdateUsernameInput;
};

export type Notification = {
  __typename?: 'Notification';
  comment?: Maybe<Comment>;
  createdAt: Scalars['DateTime']['output'];
  follow?: Maybe<Follow>;
  id: Scalars['String']['output'];
  initiator?: Maybe<User>;
  like?: Maybe<Like>;
  story?: Maybe<Story>;
  type: Scalars['String']['output'];
  user: User;
};

export enum NotificationType {
  Comment = 'COMMENT',
  Follow = 'FOLLOW',
  Like = 'LIKE',
  Mention = 'MENTION'
}

export type NotificationUnion = CommentNotification | FollowNotification | LikeNotification | MentionNotification;

export type NotificationsCountSubscribe = {
  __typename?: 'NotificationsCountSubscribe';
  count: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

export type PaginationInput = {
  cursor?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  ensureUsernameNotExists: UserExistsResponse;
  getAllNotifications?: Maybe<Array<NotificationUnion>>;
  getAllStories: Array<Story>;
  getCmmentsCount: CommentsCountResponse;
  getCommentLikesCount: LikesCountResponse;
  getComments: Array<Comment>;
  getCommentsNotifications?: Maybe<Array<CommentNotification>>;
  getCurrentUser: User;
  getFavoritesCount: FavoritesCountResponse;
  getFollowers: Array<Follow>;
  getFollowersCount: FollowsCountResponse;
  getFollowing: Array<Follow>;
  getFollowingCount: FollowsCountResponse;
  getFollowsNotifications?: Maybe<Array<FollowNotification>>;
  getFriends: Array<Follow>;
  getLikesNotifications?: Maybe<Array<LikeNotification>>;
  getMentionsNotifications?: Maybe<Array<MentionNotification>>;
  getNewNotificationsCount: Scalars['Float']['output'];
  getReplies: Array<Comment>;
  getSharesCount: SharesCountResponse;
  getStory?: Maybe<Story>;
  getStoryLikesCount: LikesCountResponse;
  getUserByUsername?: Maybe<User>;
  getUserFavorites: Array<Favorite>;
  getUserStories: Array<Story>;
  getUserStoryLikes: Array<Like>;
};


export type QueryEnsureUsernameNotExistsArgs = {
  usernameInput: GetUserByUsernameInput;
};


export type QueryGetAllNotificationsArgs = {
  paginationInput?: InputMaybe<PaginationInput>;
};


export type QueryGetAllStoriesArgs = {
  paginationInput?: InputMaybe<PaginationInput>;
};


export type QueryGetCmmentsCountArgs = {
  getCmmentsCountInput: GetCommentsCountInput;
};


export type QueryGetCommentLikesCountArgs = {
  likesCountInput: LikeCommentInput;
};


export type QueryGetCommentsArgs = {
  getCommentsInput: GetCommentsInput;
  paginationInput?: InputMaybe<PaginationInput>;
};


export type QueryGetCommentsNotificationsArgs = {
  paginationInput?: InputMaybe<PaginationInput>;
};


export type QueryGetFavoritesCountArgs = {
  getFavoritesCountInput: GetFavoritesCountInput;
};


export type QueryGetFollowersArgs = {
  getFollowersInput: FollowInput;
  paginationInput?: InputMaybe<PaginationInput>;
};


export type QueryGetFollowersCountArgs = {
  getFollowersCountInput: FollowInput;
};


export type QueryGetFollowingArgs = {
  getFollowingInput: FollowInput;
  paginationInput?: InputMaybe<PaginationInput>;
};


export type QueryGetFollowingCountArgs = {
  getFollowingCountInput: FollowInput;
};


export type QueryGetFollowsNotificationsArgs = {
  paginationInput?: InputMaybe<PaginationInput>;
};


export type QueryGetFriendsArgs = {
  paginationInput?: InputMaybe<PaginationInput>;
};


export type QueryGetLikesNotificationsArgs = {
  paginationInput?: InputMaybe<PaginationInput>;
};


export type QueryGetMentionsNotificationsArgs = {
  paginationInput?: InputMaybe<PaginationInput>;
};


export type QueryGetRepliesArgs = {
  getRepliesInput: GetRepliesInput;
  paginationInput?: InputMaybe<RepliesPaginationInput>;
};


export type QueryGetSharesCountArgs = {
  getSharesCountInput: GetSharesCountInput;
};


export type QueryGetStoryArgs = {
  getStoryInput: GetStoryInput;
};


export type QueryGetStoryLikesCountArgs = {
  likesCountInput: LikeStoryInput;
};


export type QueryGetUserByUsernameArgs = {
  usernameInput: GetUserByUsernameInput;
};


export type QueryGetUserFavoritesArgs = {
  getUserFavoritesInput: GetUserFavoritesInput;
  paginationInput?: InputMaybe<PaginationInput>;
};


export type QueryGetUserStoriesArgs = {
  getUserStoriesInput: GetUserStoriesInput;
  paginationInput?: InputMaybe<PaginationInput>;
};


export type QueryGetUserStoryLikesArgs = {
  getUserStoryLikesInput: GetUserStoryLikesInput;
  paginationInput?: InputMaybe<PaginationInput>;
};

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  access_token: Scalars['String']['output'];
};

export type RemoveCommentInput = {
  commentId: Scalars['String']['input'];
};

export type RemoveCommentResponse = {
  __typename?: 'RemoveCommentResponse';
  success: Scalars['Boolean']['output'];
};

export type RemoveFavoriteResponse = {
  __typename?: 'RemoveFavoriteResponse';
  success: Scalars['Boolean']['output'];
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

export type Share = {
  __typename?: 'Share';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  story: Story;
  user: User;
};

export type ShareInput = {
  storyId: Scalars['String']['input'];
};

export type SharesCountResponse = {
  __typename?: 'SharesCountResponse';
  count: Scalars['Float']['output'];
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

export type Story = {
  __typename?: 'Story';
  commentsCount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  favoritesCount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  isFavorited: Scalars['Boolean']['output'];
  isLiked: Scalars['Boolean']['output'];
  isShared: Scalars['Boolean']['output'];
  likesCount: Scalars['Float']['output'];
  musicId?: Maybe<Scalars['String']['output']>;
  sharesCount: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  user: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  newNotificationsCountUpdated: NotificationsCountSubscribe;
};

export type UnfollowResponse = {
  __typename?: 'UnfollowResponse';
  success: Scalars['Boolean']['output'];
};

export type UnlikeResponse = {
  __typename?: 'UnlikeResponse';
  success: Scalars['Boolean']['output'];
};

export type UpdateLastViewedDateResponse = {
  __typename?: 'UpdateLastViewedDateResponse';
  success: Scalars['Boolean']['output'];
};

export type UpdateUserInput = {
  bio: Scalars['String']['input'];
  displayName: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UpdateUsernameInput = {
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  bio: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  displayName: Scalars['String']['output'];
  followersCount: Scalars['Float']['output'];
  followingCount: Scalars['Float']['output'];
  friendsCount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isFollowedBy: Scalars['Boolean']['output'];
  isFollowing: Scalars['Boolean']['output'];
  likesCount: Scalars['Float']['output'];
  username: Scalars['String']['output'];
};

export type UserExistsResponse = {
  __typename?: 'UserExistsResponse';
  exists: Scalars['Boolean']['output'];
};

export type UserMetadata = {
  __typename?: 'UserMetadata';
  id: Scalars['String']['output'];
};
