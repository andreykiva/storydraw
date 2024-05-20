import React from 'react';
import styles from './CloseButton.module.scss';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import closeIcon from '@/assets/icons/close.svg?url';

const CloseButton = ({ className, ...rest }: React.ComponentProps<'button'>) => {
	return (
		<RoundButton className={[styles.CloseButton, className].join(' ')} {...rest}>
			<img src={closeIcon} alt="CLose" />
		</RoundButton>
	);
};

export default CloseButton;
