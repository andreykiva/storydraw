import React from 'react';
import styles from './RegisterOptions.module.css';
import userImg from '../../../assets/icons/user.svg';
import googleImg from '../../../assets/icons/google.svg';
import facebookImg from '../../../assets/icons/facebook.svg';
import twitterImg from '../../../assets/icons/twitter.svg';
import AuthOption from '../../AuthOption/AuthOption';

const RegisterOptions = ({ openForm }) => {
	const loginWith = () => {
		console.log('Login');
	};

	const options = [
		{
			title: 'Use phone or email',
			alt: 'Phone/Email',
			img: userImg,
			handleClick: openForm,
		},
		{
			title: 'Continue with Google',
			alt: 'Google',
			img: googleImg,
			handleClick: loginWith,
		},
		{
			title: 'Continue with Facebook',
			alt: 'Facebook',
			img: facebookImg,
			handleClick: loginWith,
		},
		{
			title: 'Continue with Twitter',
			alt: 'Twitter',
			img: twitterImg,
			handleClick: loginWith,
		},
	];

	return (
		<div className={styles.RegisterOptions}>
			<h3 className={styles.Title}>Sign Up for StoryDraw</h3>
			<ul className={styles.RegisterOptionsList}>
				{options.map((option) => (
					<AuthOption key={option.alt} {...option} />
				))}
			</ul>
		</div>
	);
};

export default RegisterOptions;
