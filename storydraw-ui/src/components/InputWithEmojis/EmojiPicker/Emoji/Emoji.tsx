import styles from './Emoji.module.scss';

type EmojiProps = {
	emoji: string;
	onSelect: () => void;
};

const Emoji = ({ emoji, onSelect }: EmojiProps) => {
	return (
		<li className={styles.Emoji} onClick={onSelect}>
			{emoji}
		</li>
	);
};

export default Emoji;
