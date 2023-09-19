import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import HTag from '@/components/ui/HTag/HTag';
import WithLogin from './WithLogin/WIthLogin';
import WithPhone from './WithPhone/WithPhone';

type LoginFormProps = {
	openReset: () => void;
};

type LoginMethod = 'login' | 'phone';

const LoginForm = ({ openReset }: LoginFormProps) => {
	const [loginMethod, setLoginMethod] = useState<LoginMethod>('phone');

	return (
		<div>
			<HTag tag="h2" className={authSharedStyles.Title}>
				Log in
			</HTag>
			{loginMethod === 'login' && (
				<WithLogin openReset={openReset} openWithPhone={setLoginMethod.bind(this, 'phone')} />
			)}
			{loginMethod === 'phone' && (
				<WithPhone openReset={openReset} openWithLogin={setLoginMethod.bind(this, 'login')} />
			)}
		</div>
	);
};

export default LoginForm;
