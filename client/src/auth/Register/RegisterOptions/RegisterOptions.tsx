import React from 'react';
import styles from './RegisterOptions.module.scss';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import userIcon from '@/assets/icons/auth/user.svg?url';
import googleIcon from '@/assets/icons/auth/google.svg?url';
import facebookIcon from '@/assets/icons/auth/facebook.svg?url';
import twitterIcon from '@/assets/icons/auth/twitter.svg?url';
import AuthOption from '@/auth/AuthOption/AuthOption';
import HTag from '@/components/ui/HTag/HTag';

type RegisterOptionsProps = {
	openForm: () => void;
};

const RegisterOptions = ({ openForm }: RegisterOptionsProps) => {
	const loginWith = () => {
		console.log('Login');
	};

	const options = [
		{
			title: 'Use phone or email',
			alt: 'Phone/Email',
			icon: userIcon,
			onClick: openForm,
		},
		{
			title: 'Continue with Google',
			alt: 'Google',
			icon: googleIcon,
			onClick: loginWith,
		},
		{
			title: 'Continue with Facebook',
			alt: 'Facebook',
			icon: facebookIcon,
			onClick: loginWith,
		},
		{
			title: 'Continue with Twitter',
			alt: 'Twitter',
			icon: twitterIcon,
			onClick: loginWith,
		},
	];

	return (
		<div className={styles.RegisterOptions}>
			<HTag tag="h2" className={authSharedStyles.Title}>
				Sign Up for StoryDraw
			</HTag>
			<ul className={styles.RegisterOptionsList}>
				{options.map((option) => (
					<AuthOption key={option.alt} {...option} />
				))}
			</ul>
		</div>
	);
};

export default RegisterOptions;
