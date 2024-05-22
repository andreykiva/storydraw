import React from 'react';
import styles from './Trial.module.scss';
import HTag from '@/components/ui/HTag/HTag';
import TrialInfoItem from './TrialInfoItem/TrialInfoItem';
import lockIcon from '@/assets/icons/subscribe/lock.svg?url';
import bellIcon from '@/assets/icons/subscribe/bell.svg?url';
import checkIcon from '@/assets/icons/subscribe/check.svg?url';

const Trial = () => {
	return (
		<div className={styles.Trial}>
			<HTag tag="h2" className={styles.TrialTitle}>
				We will send you a reminder <br /> <span>2 days</span> before the review ends
			</HTag>
			<div className={styles.TrialInfoBox}>
				<TrialInfoItem title="Today" descr="Full access to all Super StoryDraw features" icon={lockIcon} />
				<TrialInfoItem title="Day 12" descr="Reminder about the end of the trial period" icon={bellIcon} />
				<TrialInfoItem
					title="Day 14"
					descr="Charges apply, you can cancel anytime up to 24 hours before this date"
					icon={checkIcon}
				/>
			</div>
		</div>
	);
};

export default Trial;
