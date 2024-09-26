import CommentPlaceholder from './CommentPlaceholder/CommentPlaceholder';
import styles from './CommentsPlaceholder.module.scss';

type CommentsPlaceholderProps = {
	length: number;
};

function CommentsPlaceholder({ length }: CommentsPlaceholderProps) {
	return (
		<div className={styles.CommentsPlaceholder}>
			<div className={styles.Comments}>
				{Array.from({ length: length > 0 ? length : 5 }).map((_, index) => (
					<CommentPlaceholder key={index} />
				))}
			</div>
			<div className={styles.CreateComment}>
				<div className={styles.CreateInput}></div>
			</div>
		</div>
	);
}

export default CommentsPlaceholder;
