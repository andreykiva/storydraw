import React from 'react';
import styles from './DeleteAccountInformation.module.scss';
import Button from '@/components/ui/buttons/Button/Button';
import HTag from '@/components/ui/HTag/HTag';

type DeleteAccountInformationProps = {
	onContinue: () => void;
};

const DeleteAccountInformation = ({ onContinue }: DeleteAccountInformationProps) => {
	const myTestUsername = 'andrewtest1237';

	return (
		<>
			<HTag tag="h3" className={styles.Title}>
				{myTestUsername}: delete this account?
			</HTag>
			<div className={styles.DeleteAccountInformation}>
				<p className={styles.InfoText}>
					Your account will be deactivated for <strong>30 days</strong> and won't be visible to the public.
					During deactivation, you can reactivate your StoryDraw account anytime. After
					<strong> 30 days</strong>, your account and data will be deleted permanently.
				</p>
				<p className={styles.InfoText}>If you delete your account:</p>
				<ul className={styles.InfoList}>
					<li>You won't be able to log in and use any StoryDraw services with that account</li>
					<li>You will lose access to all your stories</li>
					<li>
						Information that isn't stored in your account, such as direct messages, may still be visible to
						others
					</li>
					<li>
						Information that isn't stored on StoryDraw servers, such as drafts, will be removed. You won't
						be able to download such information after deleting your account.
					</li>
					<li>You won't be able to get a refund on any items you purchased or received.</li>
				</ul>
				<p className={styles.InfoText}>Do you want to continue?</p>
			</div>
			<Button className={styles.ContinueBtn} onClick={onContinue}>
				Continue
			</Button>
		</>
	);
};

export default DeleteAccountInformation;
