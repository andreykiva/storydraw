import cn from 'classnames';
import styles from './CloseButton.module.scss';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import closeIcon from '@/assets/icons/close.svg';

const CloseButton = ({ className, ...rest }: React.ComponentProps<'button'>) => {
	return (
		<RoundButton className={cn(styles.CloseButton, className)} {...rest}>
			<img src={closeIcon} alt="CLose" className={styles.CloseIcon} />
		</RoundButton>
	);
};

export default CloseButton;
