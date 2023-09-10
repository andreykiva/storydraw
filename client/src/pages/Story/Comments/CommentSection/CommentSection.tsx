import React, { useState } from 'react';
import styles from './CommentSection.module.css';
import ArrowIcon from '@/components/ui/icons/ArrowIcon';
import Comment from './Comment/Comment';
import Replies from './Replies/Replies';
import { formatNumber } from '@/utils/numberUtils';

type CommentSectionProps = {
	id: string,
	text: string,
	date: string,
	likes: number,
	replies: number,
	user: {
		id: string,
		username: string,
		title: string,
		image: string,
	},
};

const CommentSection = (props: CommentSectionProps) => {
	const [showReplies, setShowReplies] = useState(false);
	const { replies } = props;

	const toggleReplies = () => {
		setShowReplies(!showReplies);
	};

	return (
		<div className={styles.CommentSection}>
			<Comment reply={false} {...props} />
			{replies && !showReplies ? (
				<div className={styles.ViewRepliesBtn} onClick={toggleReplies}>
					View {formatNumber(replies)} Replies
					<ArrowIcon className={styles.ArrowIcon} />
				</div>
			) : null}

			{showReplies && <Replies />}

			{showReplies && (
				<div className={styles.HideReplies}>
					<div className={styles.HideRepliesBtn} onClick={toggleReplies}>
						Hide
						<ArrowIcon className={styles.ArrowIcon} />
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentSection;
