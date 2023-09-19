import React from 'react';
import styles from './RegisterOptions.module.css';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import userImg from '@/assets/icons/auth/user.svg';
import googleImg from '@/assets/icons/auth/google.svg';
import facebookImg from '@/assets/icons/auth/facebook.svg';
import twitterImg from '@/assets/icons/auth/twitter.svg';
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
			image: userImg,
			handleClick: openForm,
		},
		{
			title: 'Continue with Google',
			alt: 'Google',
			image: googleImg,
			handleClick: loginWith,
		},
		{
			title: 'Continue with Facebook',
			alt: 'Facebook',
			image: facebookImg,
			handleClick: loginWith,
		},
		{
			title: 'Continue with Twitter',
			alt: 'Twitter',
			image: twitterImg,
			handleClick: loginWith,
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
