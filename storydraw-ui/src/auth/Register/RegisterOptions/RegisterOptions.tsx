import React from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import userIcon from '@/assets/icons/auth/user.svg';
import googleIcon from '@/assets/icons/auth/google.svg';
import facebookIcon from '@/assets/icons/auth/facebook.svg';
import twitterIcon from '@/assets/icons/auth/twitter.svg';
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
		<div>
			<HTag tag="h2" className={authSharedStyles.Title}>
				Sign Up for StoryDraw
			</HTag>
			<ul className={authSharedStyles.AuthOptionsList}>
				{options.map((option) => (
					<AuthOption key={option.alt} {...option} />
				))}
			</ul>
		</div>
	);
};

export default RegisterOptions;
