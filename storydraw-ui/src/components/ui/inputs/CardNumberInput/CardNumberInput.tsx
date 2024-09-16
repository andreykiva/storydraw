import cn from 'classnames';
import styles from './CardNumberInput.module.scss';
import Input from '@/components/ui/inputs/Input/Input';
import visaIcon from '@/assets/icons/subscribe/visa.png';
import masterCardIcon from '@/assets/icons/subscribe/master-card.png';
import discoverIcon from '@/assets/icons/subscribe/discover.png';
import americanExpressIcon from '@/assets/icons/subscribe/american-express.png';

type CardNumberInputProps = React.ComponentProps<'input'> & {
	error: string;
};

const CardNumberInput = ({ error, ...rest }: CardNumberInputProps) => {
	return (
		<div className={cn(styles.CardNumberInput, error && styles.WithError)}>
			<Input
				autoComplete="billing cc-number"
				inputMode="numeric"
				error={error}
				maxLength={19}
				placeholder="1234 1234 1234 1234"
				{...rest}
			/>
			<div className={styles.CardsIcons}>
				<img src={visaIcon} alt="Visa" />
				<img src={masterCardIcon} alt="Master Card" />
				<img src={discoverIcon} alt="Discover" />
				<img src={americanExpressIcon} alt="American Express" />
			</div>
		</div>
	);
};

export default CardNumberInput;
