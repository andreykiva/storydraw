import React, { useState } from 'react';
import styles from './CommentSection.module.css';
import ArrowIcon from '@/assets/icons/arrow.svg';
import Comment from './Comment/Comment';
import Replies from './Replies/Replies';
import { formatNumber } from '@/utils/numberUtils';
import type CommentType from '@/types/Comment';
import type User from '@/types/User';

type CommentSectionProps = CommentType & {
	user: Omit<User, 'description' | 'followers'>;
};

const CommentSection = (props: CommentSectionProps) => {
	const [showReplies, setShowReplies] = useState(false);
	const { replies } = props;

	const handleRepliesToggle = () => {
		setShowReplies(!showReplies);
	};

	return (
		<div className={styles.CommentSection}>
			<Comment reply={false} {...props} />
			{replies && !showReplies ? (
				<div className={styles.ViewRepliesBtn} onClick={handleRepliesToggle}>
					View {formatNumber(replies)} Replies
					<ArrowIcon className={styles.ArrowIcon} />
				</div>
			) : null}

			{showReplies && <Replies />}

			{showReplies && (
				<div className={styles.HideReplies}>
					<div className={styles.HideRepliesBtn} onClick={handleRepliesToggle}>
						Hide
						<ArrowIcon className={styles.ArrowIcon} />
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentSection;
