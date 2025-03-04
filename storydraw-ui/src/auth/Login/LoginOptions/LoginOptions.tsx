import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import qrCodeIcon from '@/assets/icons/auth/qr-code.svg';
import userIcon from '@/assets/icons/auth/user.svg';
import googleIcon from '@/assets/icons/auth/google.svg';
import facebookIcon from '@/assets/icons/auth/facebook.svg';
import twitterIcon from '@/assets/icons/auth/twitter.svg';
import appleIcon from '@/assets/icons/auth/apple.svg';
import instagramIcon from '@/assets/icons/auth/instagram.svg';
import AuthOption from '@/auth/AuthOption/AuthOption';
import HTag from '@/components/ui/HTag/HTag';

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
			icon: qrCodeIcon,
			onClick: openQRCode,
		},
		{
			title: 'Use phone / email / username',
			alt: 'Phone/Email/Username',
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
		{
			title: 'Continue with Apple',
			alt: 'Apple',
			icon: appleIcon,
			onClick: loginWith,
		},
		{
			title: 'Continue with Instagram',
			alt: 'Instagram',
			icon: instagramIcon,
			onClick: loginWith,
		},
	];

	return (
		<div>
			<HTag tag="h2" className={authSharedStyles.Title}>
				Log in to StoryDraw
			</HTag>
			<ul className={authSharedStyles.AuthOptionsList}>
				{options.map((option) => (
					<AuthOption key={option.alt} {...option} />
				))}
			</ul>
		</div>
	);
};

export default LoginOptions;
