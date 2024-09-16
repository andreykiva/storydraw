import React from 'react';
import styles from './Compare.module.scss';
import HTag from '@/components/ui/HTag/HTag';
import CompareItem from './CompareItem/CompareItem';
import premiumIcon from '@/assets/icons/premium.svg';

const compareItems = [
	{
		title: 'Additional option 1',
		isFree: true,
	},
	{
		title: 'Additional option 2',
		isFree: false,
	},
	{
		title: 'Additional option 3',
		isFree: false,
	},
	{
		title: 'Additional option 4',
		isFree: false,
	},
	{
		title: 'Additional option 5',
		isFree: false,
	},
];

const Compare = () => {
	return (
		<div className={styles.Compare}>
			<HTag tag="h2" className={styles.CompareTitle}>
				Accelerate your drawing progress with Premium!
			</HTag>
			<div className={styles.CompareInfoBox}>
				<div className={styles.InfoBoxInner}>
					<div className={styles.PremiumHighlightBox}></div>
					<div className={styles.InfoBoxHeader}>
						<div className={styles.HeaderSpacer}></div>
						<div className={styles.HeaderItem}>Free</div>
						<div className={styles.HeaderItem}>
							<img src={premiumIcon} alt="Premium" className={styles.PremiumIcon} />
						</div>
					</div>
					{compareItems.map((compareItem) => (
						<CompareItem key={compareItem.title} title={compareItem.title} isFree={compareItem.isFree} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Compare;
