/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n\tfragment AuthResponseFragment on AuthResponse {\n\t\taccess_token\n\t\trefresh_token\n\t\tuser {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\timageUrl\n\t\t}\n\t}\n": types.AuthResponseFragmentFragmentDoc,
    "\n\tfragment GenerateCodeResponseFragment on GenerateCodeResponse {\n\t\tsuccess\n\t\tmessage\n\t}\n": types.GenerateCodeResponseFragmentFragmentDoc,
    "\n\tmutation GeneratePhoneCodeForSignup($generateCodeInput: GeneratePhoneCodeInput!) {\n\t\tgeneratePhoneCodeForSignup(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n": types.GeneratePhoneCodeForSignupDocument,
    "\n\tmutation GenerateEmailCodeForSignup($generateCodeInput: GenerateEmailCodeInput!) {\n\t\tgenerateEmailCodeForSignup(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n": types.GenerateEmailCodeForSignupDocument,
    "\n\tmutation SignupWithPhoneAndCode($signupInput: SignupWithPhoneAndCodeInput!) {\n\t\tsignupWithPhoneAndCode(signupInput: $signupInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n": types.SignupWithPhoneAndCodeDocument,
    "\n\tmutation SignupWithEmailAndPassAndCode($signupInput: SignupWithEmailAndPassAndCodeInput!) {\n\t\tsignupWithEmailAndPassAndCode(signupInput: $signupInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n": types.SignupWithEmailAndPassAndCodeDocument,
    "\n\tmutation GeneratePhoneCodeForLogin($generateCodeInput: GeneratePhoneCodeInput!) {\n\t\tgeneratePhoneCodeForLogin(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n": types.GeneratePhoneCodeForLoginDocument,
    "\n\tmutation LoginWithPhoneAndCode($loginInput: LoginWithPhoneAndCodeInput!) {\n\t\tloginWithPhoneAndCode(loginInput: $loginInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n": types.LoginWithPhoneAndCodeDocument,
    "\n\tmutation LoginWithPhoneAndPass($loginInput: LoginWithPhoneAndPassInput!) {\n\t\tloginWithPhoneAndPass(loginInput: $loginInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n": types.LoginWithPhoneAndPassDocument,
    "\n\tmutation LoginWithEmailAndPass($loginInput: LoginWithEmailAndPassInput!) {\n\t\tloginWithEmailAndPass(loginInput: $loginInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n": types.LoginWithEmailAndPassDocument,
    "\n\tmutation LoginWithUsernameAndPass($loginInput: LoginWithUsernameAndPassInput!) {\n\t\tloginWithUsernameAndPass(loginInput: $loginInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n": types.LoginWithUsernameAndPassDocument,
    "\n\tmutation RefreshToken($token: String!) {\n\t\trefreshToken(token: $token) {\n\t\t\taccess_token\n\t\t}\n\t}\n": types.RefreshTokenDocument,
    "\n\tmutation GeneratePhoneCodeForReset($generateCodeInput: GeneratePhoneCodeInput!) {\n\t\tgeneratePhoneCodeForReset(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n": types.GeneratePhoneCodeForResetDocument,
    "\n\tmutation GenerateEmailCodeForReset($generateCodeInput: GenerateEmailCodeInput!) {\n\t\tgenerateEmailCodeForReset(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n": types.GenerateEmailCodeForResetDocument,
    "\n\tmutation ResetPasswordWithPhone($resetPasswordInput: ResetWithPhoneInput!) {\n\t\tresetPasswordWithPhone(resetPasswordInput: $resetPasswordInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n": types.ResetPasswordWithPhoneDocument,
    "\n\tmutation ResetPasswordWithEmail($resetPasswordInput: ResetWithEmailInput!) {\n\t\tresetPasswordWithEmail(resetPasswordInput: $resetPasswordInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n": types.ResetPasswordWithEmailDocument,
    "\n\tmutation LikeComment($likeCommentInput: LikeCommentInput!) {\n\t\tlikeComment(likeCommentInput: $likeCommentInput) {\n\t\t\tid\n\t\t}\n\t}\n": types.LikeCommentDocument,
    "\n\tmutation UnlikeComment($unlikeCommentInput: LikeCommentInput!) {\n\t\tunlikeComment(unlikeCommentInput: $unlikeCommentInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.UnlikeCommentDocument,
    "\n\tmutation CreateComment($createCommentInput: CreateCommentInput!) {\n\t\tcreateComment(createCommentInput: $createCommentInput) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t}\n\t}\n": types.CreateCommentDocument,
    "\n\tmutation CreateReply($createReplyInput: CreateReplyInput!) {\n\t\tcreateReply(createReplyInput: $createReplyInput) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t}\n\t}\n": types.CreateReplyDocument,
    "\n\tmutation RemoveComment($removeCommentInput: RemoveCommentInput!) {\n\t\tremoveComment(removeCommentInput: $removeCommentInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.RemoveCommentDocument,
    "\n\tquery GetComments($getCommentsInput: GetCommentsInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {\n\t\tgetComments(getCommentsInput: $getCommentsInput, paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tlikesCount\n\t\t\trepliesCount\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tisLiked @include(if: $isAuth)\n\t\t}\n\t}\n": types.GetCommentsDocument,
    "\n\tquery GetReplies($getRepliesInput: GetRepliesInput!, $paginationInput: RepliesPaginationInput, $isAuth: Boolean!) {\n\t\tgetReplies(getRepliesInput: $getRepliesInput, paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tlikesCount\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tisLiked @include(if: $isAuth)\n\t\t}\n\t}\n": types.GetRepliesDocument,
    "\n\tmutation UpdateLastNotificationsViewed {\n\t\tupdateLastNotificationsViewed {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.UpdateLastNotificationsViewedDocument,
    "\n\tquery GetLikesNotifications($paginationInput: PaginationInput) {\n\t\tgetLikesNotifications(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttype\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tusername\n\t\t\t\t}\n\t\t\t}\n\t\t\tinitiator {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tlike {\n\t\t\t\tcomment {\n\t\t\t\t\tcontent\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetLikesNotificationsDocument,
    "\n\tquery GetCommentsNotifications($paginationInput: PaginationInput) {\n\t\tgetCommentsNotifications(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttype\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tusername\n\t\t\t\t}\n\t\t\t}\n\t\t\tinitiator {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tcomment {\n\t\t\t\tcontent\n\t\t\t\tparentComment {\n\t\t\t\t\tcontent\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tparentReply {\n\t\t\t\t\tcontent\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetCommentsNotificationsDocument,
    "\n\tquery GetMentionsNotifications($paginationInput: PaginationInput) {\n\t\tgetMentionsNotifications(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttype\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tdescription\n\t\t\t\tuser {\n\t\t\t\t\tusername\n\t\t\t\t}\n\t\t\t}\n\t\t\tinitiator {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tcomment {\n\t\t\t\tcontent\n\t\t\t}\n\t\t}\n\t}\n": types.GetMentionsNotificationsDocument,
    "\n\tquery GetFollowsNotifications($paginationInput: PaginationInput) {\n\t\tgetFollowsNotifications(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttype\n\t\t\tcreatedAt\n\t\t\tinitiator {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing\n\t\t\t}\n\t\t}\n\t}\n": types.GetFollowsNotificationsDocument,
    "\n\tquery GetAllNotifications($paginationInput: PaginationInput) {\n\t\tgetAllNotifications(paginationInput: $paginationInput) {\n\t\t\t... on LikeNotification {\n\t\t\t\tid\n\t\t\t\ttype\n\t\t\t\tcreatedAt\n\t\t\t\tstory {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tusername\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tinitiator {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t\tdisplayName\n\t\t\t\t\timageUrl\n\t\t\t\t}\n\t\t\t\tlike {\n\t\t\t\t\tcomment {\n\t\t\t\t\t\tcontent\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on CommentNotification {\n\t\t\t\tid\n\t\t\t\ttype\n\t\t\t\tcreatedAt\n\t\t\t\tstory {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tusername\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tinitiator {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t\tdisplayName\n\t\t\t\t\timageUrl\n\t\t\t\t}\n\t\t\t\tcomment {\n\t\t\t\t\tcontent\n\t\t\t\t\tparentComment {\n\t\t\t\t\t\tcontent\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tparentReply {\n\t\t\t\t\t\tcontent\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on MentionNotification {\n\t\t\t\tid\n\t\t\t\ttype\n\t\t\t\tcreatedAt\n\t\t\t\tstory {\n\t\t\t\t\tid\n\t\t\t\t\tdescription\n\t\t\t\t\tuser {\n\t\t\t\t\t\tusername\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tinitiator {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t\tdisplayName\n\t\t\t\t\timageUrl\n\t\t\t\t}\n\t\t\t\tcomment {\n\t\t\t\t\tcontent\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on FollowNotification {\n\t\t\t\tid\n\t\t\t\ttype\n\t\t\t\tcreatedAt\n\t\t\t\tinitiator {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t\tdisplayName\n\t\t\t\t\timageUrl\n\t\t\t\t\tisFollowing\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetAllNotificationsDocument,
    "\n\tquery GetNewNotificationsCount {\n\t\tgetNewNotificationsCount\n\t}\n": types.GetNewNotificationsCountDocument,
    "\n\tsubscription NnewNotificationsCountSubscription {\n\t\tnewNotificationsCountUpdated {\n\t\t\tcount\n\t\t}\n\t}\n": types.NnewNotificationsCountSubscriptionDocument,
    "\n\tmutation CreateStory($createStoryInput: CreateStoryInput!) {\n\t\tcreateStory(createStoryInput: $createStoryInput) {\n\t\t\tid\n\t\t\ttitle\n\t\t}\n\t}\n": types.CreateStoryDocument,
    "\n\tmutation LikeStory($likeStoryInput: LikeStoryInput!) {\n\t\tlikeStory(likeStoryInput: $likeStoryInput) {\n\t\t\tid\n\t\t}\n\t}\n": types.LikeStoryDocument,
    "\n\tmutation UnlikeStory($unlikeStoryInput: LikeStoryInput!) {\n\t\tunlikeStory(unlikeStoryInput: $unlikeStoryInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.UnlikeStoryDocument,
    "\n\tmutation AddFavorite($addFavoriteInput: AddFavoriteInput!) {\n\t\taddFavorite(addFavoriteInput: $addFavoriteInput) {\n\t\t\tid\n\t\t}\n\t}\n": types.AddFavoriteDocument,
    "\n\tmutation RemoveFavorite($removeFavoriteInput: AddFavoriteInput!) {\n\t\tremoveFavorite(removeFavoriteInput: $removeFavoriteInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.RemoveFavoriteDocument,
    "\n\tmutation Share($shareInput: ShareInput!) {\n\t\tshare(shareInput: $shareInput) {\n\t\t\tid\n\t\t}\n\t}\n": types.ShareDocument,
    "\n\tquery GetFeed($paginationInput: PaginationInput, $isAuth: Boolean!) {\n\t\tgetAllStories(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tdescription\n\t\t\tcreatedAt\n\t\t\tmusicId\n\t\t\tlikesCount\n\t\t\tcommentsCount\n\t\t\tfavoritesCount\n\t\t\tsharesCount\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing @include(if: $isAuth)\n\t\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\t}\n\t\t\tisLiked @include(if: $isAuth)\n\t\t\tisFavorited @include(if: $isAuth)\n\t\t\tisShared @include(if: $isAuth)\n\t\t}\n\t}\n": types.GetFeedDocument,
    "\n\tquery GetStory($getStoryInput: GetStoryInput!, $isAuth: Boolean!) {\n\t\tgetStory(getStoryInput: $getStoryInput) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tdescription\n\t\t\tcreatedAt\n\t\t\tlikesCount\n\t\t\tcommentsCount\n\t\t\tfavoritesCount\n\t\t\tsharesCount\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing @include(if: $isAuth)\n\t\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\t}\n\t\t\tisLiked @include(if: $isAuth)\n\t\t\tisFavorited @include(if: $isAuth)\n\t\t\tisShared @include(if: $isAuth)\n\t\t}\n\t}\n": types.GetStoryDocument,
    "\n\tquery GetUserStories($getUserStoriesInput: GetUserStoriesInput!, $paginationInput: PaginationInput) {\n\t\tgetUserStories(getUserStoriesInput: $getUserStoriesInput, paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\tdescription\n\t\t\tcreatedAt\n\t\t}\n\t}\n": types.GetUserStoriesDocument,
    "\n\tquery GetUserFavorites($getUserFavoritesInput: GetUserFavoritesInput!, $paginationInput: PaginationInput) {\n\t\tgetUserFavorites(getUserFavoritesInput: $getUserFavoritesInput, paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n\t}\n": types.GetUserFavoritesDocument,
    "\n\tquery GetUserStoryLikes($getUserStoryLikesInput: GetUserStoryLikesInput!, $paginationInput: PaginationInput) {\n\t\tgetUserStoryLikes(getUserStoryLikesInput: $getUserStoryLikesInput, paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n\t}\n": types.GetUserStoryLikesDocument,
    "\n\tmutation UpdateUsername($usernameInput: UpdateUsernameInput!) {\n\t\tupdateUsername(usernameInput: $usernameInput) {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\timageUrl\n\t\t}\n\t}\n": types.UpdateUsernameDocument,
    "\n\tmutation Follow($followInput: FollowInput!) {\n\t\tfollow(followInput: $followInput) {\n\t\t\tid\n\t\t}\n\t}\n": types.FollowDocument,
    "\n\tmutation Unfollow($unfollowInput: FollowInput!) {\n\t\tunfollow(unfollowInput: $unfollowInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.UnfollowDocument,
    "\n\tmutation UpdateUser($updateUserInput: UpdateUserInput!) {\n\t\tupdateUser(updateUserInput: $updateUserInput) {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\timageUrl\n\t\t\tbio\n\t\t}\n\t}\n": types.UpdateUserDocument,
    "\n\tquery GetCurrentUser {\n\t\tgetCurrentUser {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\timageUrl\n\t\t}\n\t}\n": types.GetCurrentUserDocument,
    "\n\tquery EnsureUsernameNotExists($usernameInput: GetUserByUsernameInput!) {\n\t\tensureUsernameNotExists(usernameInput: $usernameInput) {\n\t\t\texists\n\t\t}\n\t}\n": types.EnsureUsernameNotExistsDocument,
    "\n\tquery GetUserProfile($usernameInput: GetUserByUsernameInput!, $isAuth: Boolean!, $isCurrentUser: Boolean!) {\n\t\tgetUserByUsername(usernameInput: $usernameInput) {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\tbio\n\t\t\timageUrl\n\t\t\tfollowingCount\n\t\t\tfollowersCount\n\t\t\tfriendsCount @include(if: $isCurrentUser)\n\t\t\tlikesCount\n\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\tisFollowing @include(if: $isAuth)\n\t\t}\n\t}\n": types.GetUserProfileDocument,
    "\n\tquery GetFollowing($getFollowingInput: FollowInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {\n\t\tgetFollowing(getFollowingInput: $getFollowingInput, paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tfollowing {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing @include(if: $isAuth)\n\t\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\t}\n\t\t}\n\t}\n": types.GetFollowingDocument,
    "\n\tquery GetFollowers($getFollowersInput: FollowInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {\n\t\tgetFollowers(getFollowersInput: $getFollowersInput, paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tfollower {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing @include(if: $isAuth)\n\t\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\t}\n\t\t}\n\t}\n": types.GetFollowersDocument,
    "\n\tquery GetFriends($paginationInput: PaginationInput) {\n\t\tgetFriends(paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tfollowing {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t}\n\t}\n": types.GetFriendsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment AuthResponseFragment on AuthResponse {\n\t\taccess_token\n\t\trefresh_token\n\t\tuser {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\timageUrl\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment AuthResponseFragment on AuthResponse {\n\t\taccess_token\n\t\trefresh_token\n\t\tuser {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\timageUrl\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment GenerateCodeResponseFragment on GenerateCodeResponse {\n\t\tsuccess\n\t\tmessage\n\t}\n"): (typeof documents)["\n\tfragment GenerateCodeResponseFragment on GenerateCodeResponse {\n\t\tsuccess\n\t\tmessage\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation GeneratePhoneCodeForSignup($generateCodeInput: GeneratePhoneCodeInput!) {\n\t\tgeneratePhoneCodeForSignup(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation GeneratePhoneCodeForSignup($generateCodeInput: GeneratePhoneCodeInput!) {\n\t\tgeneratePhoneCodeForSignup(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation GenerateEmailCodeForSignup($generateCodeInput: GenerateEmailCodeInput!) {\n\t\tgenerateEmailCodeForSignup(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation GenerateEmailCodeForSignup($generateCodeInput: GenerateEmailCodeInput!) {\n\t\tgenerateEmailCodeForSignup(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation SignupWithPhoneAndCode($signupInput: SignupWithPhoneAndCodeInput!) {\n\t\tsignupWithPhoneAndCode(signupInput: $signupInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation SignupWithPhoneAndCode($signupInput: SignupWithPhoneAndCodeInput!) {\n\t\tsignupWithPhoneAndCode(signupInput: $signupInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation SignupWithEmailAndPassAndCode($signupInput: SignupWithEmailAndPassAndCodeInput!) {\n\t\tsignupWithEmailAndPassAndCode(signupInput: $signupInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation SignupWithEmailAndPassAndCode($signupInput: SignupWithEmailAndPassAndCodeInput!) {\n\t\tsignupWithEmailAndPassAndCode(signupInput: $signupInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation GeneratePhoneCodeForLogin($generateCodeInput: GeneratePhoneCodeInput!) {\n\t\tgeneratePhoneCodeForLogin(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation GeneratePhoneCodeForLogin($generateCodeInput: GeneratePhoneCodeInput!) {\n\t\tgeneratePhoneCodeForLogin(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation LoginWithPhoneAndCode($loginInput: LoginWithPhoneAndCodeInput!) {\n\t\tloginWithPhoneAndCode(loginInput: $loginInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation LoginWithPhoneAndCode($loginInput: LoginWithPhoneAndCodeInput!) {\n\t\tloginWithPhoneAndCode(loginInput: $loginInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation LoginWithPhoneAndPass($loginInput: LoginWithPhoneAndPassInput!) {\n\t\tloginWithPhoneAndPass(loginInput: $loginInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation LoginWithPhoneAndPass($loginInput: LoginWithPhoneAndPassInput!) {\n\t\tloginWithPhoneAndPass(loginInput: $loginInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation LoginWithEmailAndPass($loginInput: LoginWithEmailAndPassInput!) {\n\t\tloginWithEmailAndPass(loginInput: $loginInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation LoginWithEmailAndPass($loginInput: LoginWithEmailAndPassInput!) {\n\t\tloginWithEmailAndPass(loginInput: $loginInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation LoginWithUsernameAndPass($loginInput: LoginWithUsernameAndPassInput!) {\n\t\tloginWithUsernameAndPass(loginInput: $loginInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation LoginWithUsernameAndPass($loginInput: LoginWithUsernameAndPassInput!) {\n\t\tloginWithUsernameAndPass(loginInput: $loginInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation RefreshToken($token: String!) {\n\t\trefreshToken(token: $token) {\n\t\t\taccess_token\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation RefreshToken($token: String!) {\n\t\trefreshToken(token: $token) {\n\t\t\taccess_token\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation GeneratePhoneCodeForReset($generateCodeInput: GeneratePhoneCodeInput!) {\n\t\tgeneratePhoneCodeForReset(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation GeneratePhoneCodeForReset($generateCodeInput: GeneratePhoneCodeInput!) {\n\t\tgeneratePhoneCodeForReset(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation GenerateEmailCodeForReset($generateCodeInput: GenerateEmailCodeInput!) {\n\t\tgenerateEmailCodeForReset(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation GenerateEmailCodeForReset($generateCodeInput: GenerateEmailCodeInput!) {\n\t\tgenerateEmailCodeForReset(generateCodeInput: $generateCodeInput) {\n\t\t\t...GenerateCodeResponseFragment\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation ResetPasswordWithPhone($resetPasswordInput: ResetWithPhoneInput!) {\n\t\tresetPasswordWithPhone(resetPasswordInput: $resetPasswordInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ResetPasswordWithPhone($resetPasswordInput: ResetWithPhoneInput!) {\n\t\tresetPasswordWithPhone(resetPasswordInput: $resetPasswordInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation ResetPasswordWithEmail($resetPasswordInput: ResetWithEmailInput!) {\n\t\tresetPasswordWithEmail(resetPasswordInput: $resetPasswordInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ResetPasswordWithEmail($resetPasswordInput: ResetWithEmailInput!) {\n\t\tresetPasswordWithEmail(resetPasswordInput: $resetPasswordInput) {\n\t\t\t...AuthResponseFragment\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation LikeComment($likeCommentInput: LikeCommentInput!) {\n\t\tlikeComment(likeCommentInput: $likeCommentInput) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation LikeComment($likeCommentInput: LikeCommentInput!) {\n\t\tlikeComment(likeCommentInput: $likeCommentInput) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UnlikeComment($unlikeCommentInput: LikeCommentInput!) {\n\t\tunlikeComment(unlikeCommentInput: $unlikeCommentInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UnlikeComment($unlikeCommentInput: LikeCommentInput!) {\n\t\tunlikeComment(unlikeCommentInput: $unlikeCommentInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateComment($createCommentInput: CreateCommentInput!) {\n\t\tcreateComment(createCommentInput: $createCommentInput) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateComment($createCommentInput: CreateCommentInput!) {\n\t\tcreateComment(createCommentInput: $createCommentInput) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateReply($createReplyInput: CreateReplyInput!) {\n\t\tcreateReply(createReplyInput: $createReplyInput) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateReply($createReplyInput: CreateReplyInput!) {\n\t\tcreateReply(createReplyInput: $createReplyInput) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation RemoveComment($removeCommentInput: RemoveCommentInput!) {\n\t\tremoveComment(removeCommentInput: $removeCommentInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation RemoveComment($removeCommentInput: RemoveCommentInput!) {\n\t\tremoveComment(removeCommentInput: $removeCommentInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetComments($getCommentsInput: GetCommentsInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {\n\t\tgetComments(getCommentsInput: $getCommentsInput, paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tlikesCount\n\t\t\trepliesCount\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tisLiked @include(if: $isAuth)\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetComments($getCommentsInput: GetCommentsInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {\n\t\tgetComments(getCommentsInput: $getCommentsInput, paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tlikesCount\n\t\t\trepliesCount\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tisLiked @include(if: $isAuth)\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetReplies($getRepliesInput: GetRepliesInput!, $paginationInput: RepliesPaginationInput, $isAuth: Boolean!) {\n\t\tgetReplies(getRepliesInput: $getRepliesInput, paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tlikesCount\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tisLiked @include(if: $isAuth)\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetReplies($getRepliesInput: GetRepliesInput!, $paginationInput: RepliesPaginationInput, $isAuth: Boolean!) {\n\t\tgetReplies(getRepliesInput: $getRepliesInput, paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tcreatedAt\n\t\t\tlikesCount\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tisLiked @include(if: $isAuth)\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UpdateLastNotificationsViewed {\n\t\tupdateLastNotificationsViewed {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateLastNotificationsViewed {\n\t\tupdateLastNotificationsViewed {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetLikesNotifications($paginationInput: PaginationInput) {\n\t\tgetLikesNotifications(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttype\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tusername\n\t\t\t\t}\n\t\t\t}\n\t\t\tinitiator {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tlike {\n\t\t\t\tcomment {\n\t\t\t\t\tcontent\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetLikesNotifications($paginationInput: PaginationInput) {\n\t\tgetLikesNotifications(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttype\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tusername\n\t\t\t\t}\n\t\t\t}\n\t\t\tinitiator {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tlike {\n\t\t\t\tcomment {\n\t\t\t\t\tcontent\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetCommentsNotifications($paginationInput: PaginationInput) {\n\t\tgetCommentsNotifications(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttype\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tusername\n\t\t\t\t}\n\t\t\t}\n\t\t\tinitiator {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tcomment {\n\t\t\t\tcontent\n\t\t\t\tparentComment {\n\t\t\t\t\tcontent\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tparentReply {\n\t\t\t\t\tcontent\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCommentsNotifications($paginationInput: PaginationInput) {\n\t\tgetCommentsNotifications(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttype\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tuser {\n\t\t\t\t\tusername\n\t\t\t\t}\n\t\t\t}\n\t\t\tinitiator {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tcomment {\n\t\t\t\tcontent\n\t\t\t\tparentComment {\n\t\t\t\t\tcontent\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tparentReply {\n\t\t\t\t\tcontent\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetMentionsNotifications($paginationInput: PaginationInput) {\n\t\tgetMentionsNotifications(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttype\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tdescription\n\t\t\t\tuser {\n\t\t\t\t\tusername\n\t\t\t\t}\n\t\t\t}\n\t\t\tinitiator {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tcomment {\n\t\t\t\tcontent\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetMentionsNotifications($paginationInput: PaginationInput) {\n\t\tgetMentionsNotifications(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttype\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tdescription\n\t\t\t\tuser {\n\t\t\t\t\tusername\n\t\t\t\t}\n\t\t\t}\n\t\t\tinitiator {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t\tcomment {\n\t\t\t\tcontent\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetFollowsNotifications($paginationInput: PaginationInput) {\n\t\tgetFollowsNotifications(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttype\n\t\t\tcreatedAt\n\t\t\tinitiator {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetFollowsNotifications($paginationInput: PaginationInput) {\n\t\tgetFollowsNotifications(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttype\n\t\t\tcreatedAt\n\t\t\tinitiator {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetAllNotifications($paginationInput: PaginationInput) {\n\t\tgetAllNotifications(paginationInput: $paginationInput) {\n\t\t\t... on LikeNotification {\n\t\t\t\tid\n\t\t\t\ttype\n\t\t\t\tcreatedAt\n\t\t\t\tstory {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tusername\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tinitiator {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t\tdisplayName\n\t\t\t\t\timageUrl\n\t\t\t\t}\n\t\t\t\tlike {\n\t\t\t\t\tcomment {\n\t\t\t\t\t\tcontent\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on CommentNotification {\n\t\t\t\tid\n\t\t\t\ttype\n\t\t\t\tcreatedAt\n\t\t\t\tstory {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tusername\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tinitiator {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t\tdisplayName\n\t\t\t\t\timageUrl\n\t\t\t\t}\n\t\t\t\tcomment {\n\t\t\t\t\tcontent\n\t\t\t\t\tparentComment {\n\t\t\t\t\t\tcontent\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tparentReply {\n\t\t\t\t\t\tcontent\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on MentionNotification {\n\t\t\t\tid\n\t\t\t\ttype\n\t\t\t\tcreatedAt\n\t\t\t\tstory {\n\t\t\t\t\tid\n\t\t\t\t\tdescription\n\t\t\t\t\tuser {\n\t\t\t\t\t\tusername\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tinitiator {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t\tdisplayName\n\t\t\t\t\timageUrl\n\t\t\t\t}\n\t\t\t\tcomment {\n\t\t\t\t\tcontent\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on FollowNotification {\n\t\t\t\tid\n\t\t\t\ttype\n\t\t\t\tcreatedAt\n\t\t\t\tinitiator {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t\tdisplayName\n\t\t\t\t\timageUrl\n\t\t\t\t\tisFollowing\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetAllNotifications($paginationInput: PaginationInput) {\n\t\tgetAllNotifications(paginationInput: $paginationInput) {\n\t\t\t... on LikeNotification {\n\t\t\t\tid\n\t\t\t\ttype\n\t\t\t\tcreatedAt\n\t\t\t\tstory {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tusername\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tinitiator {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t\tdisplayName\n\t\t\t\t\timageUrl\n\t\t\t\t}\n\t\t\t\tlike {\n\t\t\t\t\tcomment {\n\t\t\t\t\t\tcontent\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on CommentNotification {\n\t\t\t\tid\n\t\t\t\ttype\n\t\t\t\tcreatedAt\n\t\t\t\tstory {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tusername\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tinitiator {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t\tdisplayName\n\t\t\t\t\timageUrl\n\t\t\t\t}\n\t\t\t\tcomment {\n\t\t\t\t\tcontent\n\t\t\t\t\tparentComment {\n\t\t\t\t\t\tcontent\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tparentReply {\n\t\t\t\t\t\tcontent\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on MentionNotification {\n\t\t\t\tid\n\t\t\t\ttype\n\t\t\t\tcreatedAt\n\t\t\t\tstory {\n\t\t\t\t\tid\n\t\t\t\t\tdescription\n\t\t\t\t\tuser {\n\t\t\t\t\t\tusername\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tinitiator {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t\tdisplayName\n\t\t\t\t\timageUrl\n\t\t\t\t}\n\t\t\t\tcomment {\n\t\t\t\t\tcontent\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on FollowNotification {\n\t\t\t\tid\n\t\t\t\ttype\n\t\t\t\tcreatedAt\n\t\t\t\tinitiator {\n\t\t\t\t\tid\n\t\t\t\t\tusername\n\t\t\t\t\tdisplayName\n\t\t\t\t\timageUrl\n\t\t\t\t\tisFollowing\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetNewNotificationsCount {\n\t\tgetNewNotificationsCount\n\t}\n"): (typeof documents)["\n\tquery GetNewNotificationsCount {\n\t\tgetNewNotificationsCount\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tsubscription NnewNotificationsCountSubscription {\n\t\tnewNotificationsCountUpdated {\n\t\t\tcount\n\t\t}\n\t}\n"): (typeof documents)["\n\tsubscription NnewNotificationsCountSubscription {\n\t\tnewNotificationsCountUpdated {\n\t\t\tcount\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateStory($createStoryInput: CreateStoryInput!) {\n\t\tcreateStory(createStoryInput: $createStoryInput) {\n\t\t\tid\n\t\t\ttitle\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateStory($createStoryInput: CreateStoryInput!) {\n\t\tcreateStory(createStoryInput: $createStoryInput) {\n\t\t\tid\n\t\t\ttitle\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation LikeStory($likeStoryInput: LikeStoryInput!) {\n\t\tlikeStory(likeStoryInput: $likeStoryInput) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation LikeStory($likeStoryInput: LikeStoryInput!) {\n\t\tlikeStory(likeStoryInput: $likeStoryInput) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UnlikeStory($unlikeStoryInput: LikeStoryInput!) {\n\t\tunlikeStory(unlikeStoryInput: $unlikeStoryInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UnlikeStory($unlikeStoryInput: LikeStoryInput!) {\n\t\tunlikeStory(unlikeStoryInput: $unlikeStoryInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation AddFavorite($addFavoriteInput: AddFavoriteInput!) {\n\t\taddFavorite(addFavoriteInput: $addFavoriteInput) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation AddFavorite($addFavoriteInput: AddFavoriteInput!) {\n\t\taddFavorite(addFavoriteInput: $addFavoriteInput) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation RemoveFavorite($removeFavoriteInput: AddFavoriteInput!) {\n\t\tremoveFavorite(removeFavoriteInput: $removeFavoriteInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation RemoveFavorite($removeFavoriteInput: AddFavoriteInput!) {\n\t\tremoveFavorite(removeFavoriteInput: $removeFavoriteInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation Share($shareInput: ShareInput!) {\n\t\tshare(shareInput: $shareInput) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Share($shareInput: ShareInput!) {\n\t\tshare(shareInput: $shareInput) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetFeed($paginationInput: PaginationInput, $isAuth: Boolean!) {\n\t\tgetAllStories(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tdescription\n\t\t\tcreatedAt\n\t\t\tmusicId\n\t\t\tlikesCount\n\t\t\tcommentsCount\n\t\t\tfavoritesCount\n\t\t\tsharesCount\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing @include(if: $isAuth)\n\t\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\t}\n\t\t\tisLiked @include(if: $isAuth)\n\t\t\tisFavorited @include(if: $isAuth)\n\t\t\tisShared @include(if: $isAuth)\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetFeed($paginationInput: PaginationInput, $isAuth: Boolean!) {\n\t\tgetAllStories(paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tdescription\n\t\t\tcreatedAt\n\t\t\tmusicId\n\t\t\tlikesCount\n\t\t\tcommentsCount\n\t\t\tfavoritesCount\n\t\t\tsharesCount\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing @include(if: $isAuth)\n\t\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\t}\n\t\t\tisLiked @include(if: $isAuth)\n\t\t\tisFavorited @include(if: $isAuth)\n\t\t\tisShared @include(if: $isAuth)\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetStory($getStoryInput: GetStoryInput!, $isAuth: Boolean!) {\n\t\tgetStory(getStoryInput: $getStoryInput) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tdescription\n\t\t\tcreatedAt\n\t\t\tlikesCount\n\t\t\tcommentsCount\n\t\t\tfavoritesCount\n\t\t\tsharesCount\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing @include(if: $isAuth)\n\t\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\t}\n\t\t\tisLiked @include(if: $isAuth)\n\t\t\tisFavorited @include(if: $isAuth)\n\t\t\tisShared @include(if: $isAuth)\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetStory($getStoryInput: GetStoryInput!, $isAuth: Boolean!) {\n\t\tgetStory(getStoryInput: $getStoryInput) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tdescription\n\t\t\tcreatedAt\n\t\t\tlikesCount\n\t\t\tcommentsCount\n\t\t\tfavoritesCount\n\t\t\tsharesCount\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing @include(if: $isAuth)\n\t\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\t}\n\t\t\tisLiked @include(if: $isAuth)\n\t\t\tisFavorited @include(if: $isAuth)\n\t\t\tisShared @include(if: $isAuth)\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetUserStories($getUserStoriesInput: GetUserStoriesInput!, $paginationInput: PaginationInput) {\n\t\tgetUserStories(getUserStoriesInput: $getUserStoriesInput, paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\tdescription\n\t\t\tcreatedAt\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetUserStories($getUserStoriesInput: GetUserStoriesInput!, $paginationInput: PaginationInput) {\n\t\tgetUserStories(getUserStoriesInput: $getUserStoriesInput, paginationInput: $paginationInput) {\n\t\t\tid\n\t\t\tdescription\n\t\t\tcreatedAt\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetUserFavorites($getUserFavoritesInput: GetUserFavoritesInput!, $paginationInput: PaginationInput) {\n\t\tgetUserFavorites(getUserFavoritesInput: $getUserFavoritesInput, paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetUserFavorites($getUserFavoritesInput: GetUserFavoritesInput!, $paginationInput: PaginationInput) {\n\t\tgetUserFavorites(getUserFavoritesInput: $getUserFavoritesInput, paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetUserStoryLikes($getUserStoryLikesInput: GetUserStoryLikesInput!, $paginationInput: PaginationInput) {\n\t\tgetUserStoryLikes(getUserStoryLikesInput: $getUserStoryLikesInput, paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetUserStoryLikes($getUserStoryLikesInput: GetUserStoryLikesInput!, $paginationInput: PaginationInput) {\n\t\tgetUserStoryLikes(getUserStoryLikesInput: $getUserStoryLikesInput, paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tstory {\n\t\t\t\tid\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UpdateUsername($usernameInput: UpdateUsernameInput!) {\n\t\tupdateUsername(usernameInput: $usernameInput) {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\timageUrl\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateUsername($usernameInput: UpdateUsernameInput!) {\n\t\tupdateUsername(usernameInput: $usernameInput) {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\timageUrl\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation Follow($followInput: FollowInput!) {\n\t\tfollow(followInput: $followInput) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Follow($followInput: FollowInput!) {\n\t\tfollow(followInput: $followInput) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation Unfollow($unfollowInput: FollowInput!) {\n\t\tunfollow(unfollowInput: $unfollowInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Unfollow($unfollowInput: FollowInput!) {\n\t\tunfollow(unfollowInput: $unfollowInput) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UpdateUser($updateUserInput: UpdateUserInput!) {\n\t\tupdateUser(updateUserInput: $updateUserInput) {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\timageUrl\n\t\t\tbio\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateUser($updateUserInput: UpdateUserInput!) {\n\t\tupdateUser(updateUserInput: $updateUserInput) {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\timageUrl\n\t\t\tbio\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetCurrentUser {\n\t\tgetCurrentUser {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\timageUrl\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCurrentUser {\n\t\tgetCurrentUser {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\timageUrl\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery EnsureUsernameNotExists($usernameInput: GetUserByUsernameInput!) {\n\t\tensureUsernameNotExists(usernameInput: $usernameInput) {\n\t\t\texists\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery EnsureUsernameNotExists($usernameInput: GetUserByUsernameInput!) {\n\t\tensureUsernameNotExists(usernameInput: $usernameInput) {\n\t\t\texists\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetUserProfile($usernameInput: GetUserByUsernameInput!, $isAuth: Boolean!, $isCurrentUser: Boolean!) {\n\t\tgetUserByUsername(usernameInput: $usernameInput) {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\tbio\n\t\t\timageUrl\n\t\t\tfollowingCount\n\t\t\tfollowersCount\n\t\t\tfriendsCount @include(if: $isCurrentUser)\n\t\t\tlikesCount\n\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\tisFollowing @include(if: $isAuth)\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetUserProfile($usernameInput: GetUserByUsernameInput!, $isAuth: Boolean!, $isCurrentUser: Boolean!) {\n\t\tgetUserByUsername(usernameInput: $usernameInput) {\n\t\t\tid\n\t\t\tusername\n\t\t\tdisplayName\n\t\t\tbio\n\t\t\timageUrl\n\t\t\tfollowingCount\n\t\t\tfollowersCount\n\t\t\tfriendsCount @include(if: $isCurrentUser)\n\t\t\tlikesCount\n\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\tisFollowing @include(if: $isAuth)\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetFollowing($getFollowingInput: FollowInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {\n\t\tgetFollowing(getFollowingInput: $getFollowingInput, paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tfollowing {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing @include(if: $isAuth)\n\t\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetFollowing($getFollowingInput: FollowInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {\n\t\tgetFollowing(getFollowingInput: $getFollowingInput, paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tfollowing {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing @include(if: $isAuth)\n\t\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetFollowers($getFollowersInput: FollowInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {\n\t\tgetFollowers(getFollowersInput: $getFollowersInput, paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tfollower {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing @include(if: $isAuth)\n\t\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetFollowers($getFollowersInput: FollowInput!, $paginationInput: PaginationInput, $isAuth: Boolean!) {\n\t\tgetFollowers(getFollowersInput: $getFollowersInput, paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tfollower {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t\tisFollowing @include(if: $isAuth)\n\t\t\t\tisFollowedBy @include(if: $isAuth)\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetFriends($paginationInput: PaginationInput) {\n\t\tgetFriends(paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tfollowing {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetFriends($paginationInput: PaginationInput) {\n\t\tgetFriends(paginationInput: $paginationInput) {\n\t\t\tcreatedAt\n\t\t\tfollowing {\n\t\t\t\tid\n\t\t\t\tusername\n\t\t\t\tdisplayName\n\t\t\t\timageUrl\n\t\t\t}\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;