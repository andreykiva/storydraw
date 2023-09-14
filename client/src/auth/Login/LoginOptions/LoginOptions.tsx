import React from 'react';
import styles from './LoginOptions.module.css';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import qrCodeImg from '@/assets/icons/auth/qr-code.svg';
import userImg from '@/assets/icons/auth/user.svg';
import googleImg from '@/assets/icons/auth/google.svg';
import facebookImg from '@/assets/icons/auth/facebook.svg';
import twitterImg from '@/assets/icons/auth/twitter.svg';
import appleImg from '@/assets/icons/auth/apple.svg';
import instagramImg from '@/assets/icons/auth/instagram.svg';
import AuthOption from '@/auth/AuthOption/AuthOption';
import Htag from '@/components/ui/HTag/HTag';

type LoginOptionsProps = {
	openForm: () => void;
	openQRCode: () => void;
};

const LoginOptions = ({ openForm, openQRCode }: LoginOptionsProps) => {
	const loginWith = () => {
		console.log('Login');
	};

	const options = [
		{
			title: 'Use QR code',
			alt: 'QR code',
			image: qrCodeImg,
			handleClick: openQRCode,
		},
		{
			title: 'Use phone / email / username',
			alt: 'Phone/Email/Username',
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
		{
			title: 'Continue with Apple',
			alt: 'Apple',
			image: appleImg,
			handleClick: loginWith,
		},
		{
			title: 'Continue with Instagram',
			alt: 'Instagram',
			image: instagramImg,
			handleClick: loginWith,
		},
	];

	return (
		<div className={styles.LoginOptions}>
			<Htag tag="h2" className={authSharedStyles.Title}>
				Log in to StoryDraw
			</Htag>
			<ul className={styles.LoginOptionsList}>
				{options.map((option) => (
					<AuthOption key={option.alt} {...option} />
				))}
			</ul>
		</div>
	);
};

export default LoginOptions;
