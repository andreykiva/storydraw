import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ForYouStory.module.scss';
import defaultImg from '@/assets/images/default.svg';
import previewImg from '@/assets/images/preview.jpg';
import musicIcon from '@/assets/icons/music.svg';
import { ForYouStory as ForYouStoryType } from '@/types/Story';
import InteractionPanel from './InteractionPanel/InteractionPanel';
import { UserState } from '@/features/user/userSlice';
import FollowButton from '@/components/ui/buttons/FollowButton/FollowButton';
import useFollow from '@/hooks/interaction/useFollow';
import { wrapMentions } from '@/utils/textUtils';

type ForYouStoryProps = {
	isAuth: boolean;
	story: ForYouStoryType;
	currentUser: UserState;
};

const ForYouStory = (props: ForYouStoryProps) => {
	const { isAuth, currentUser } = props;
	const { id, user, description, likesCount, commentsCount, favoritesCount, sharesCount, isLiked, isFavorited, isShared } = props.story;

	const { handleFollow, loading, isFollowing } = useFollow({
		isAuth,
		userId: user.id,
		initIsFollowing: user.isFollowing,
	});

	return (
		<div className={styles.ForYouStory}>
			<div className={styles.StoryHeader}>
				<Link to={`/@${user.username}`} className={styles.UserLink}>
					<img src={user.imageUrl || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				</Link>
				<div className={styles.HeaderInfo}>
					<Link to={`/@${user.username}`} className={styles.HeaderInfoUser}>
						<span className={styles.InfoUsername}>{user.username}</span>
						<span className={styles.InfoDisplayName}>{user.displayName}</span>
					</Link>
					<p className={styles.InfoDescr}>
						<span className={styles.DescrText}>{wrapMentions(description, styles.Mention)}</span>
						{/* {tags.map((tag) => (
							<Link to={'/tag/' + tag} key={tag} className={styles.Tag}>
								#{tag}
							</Link>
						))} */}
					</p>
					<div className={styles.InfoMusic}>
						<img src={musicIcon} alt="Music" className={styles.MusicIcon} /> {'Orbital - Halcyon And On And On'}
					</div>
				</div>
				{user.id !== currentUser.id && (
					<FollowButton
						className={styles.FollowBtn}
						onFollow={handleFollow}
						isFollowedBy={user.isFollowedBy}
						isFollowing={isFollowing}
						loading={loading}
					/>
				)}
			</div>
			<div className={styles.StoryWrapper}>
				<Link to={`/@${user.username}/story/${id}`} className={styles.StoryLink}>
					<img src={previewImg} alt="Story" className={styles.Story} />
				</Link>
				<InteractionPanel
					storyId={id}
					username={user.username}
					isAuth={isAuth}
					likesCount={likesCount}
					commentsCount={commentsCount}
					favoritesCount={favoritesCount}
					sharesCount={sharesCount}
					isLiked={isLiked}
					isFavorited={isFavorited}
					isShared={isShared}
				/>
			</div>
		</div>
	);
};

export default ForYouStory;
