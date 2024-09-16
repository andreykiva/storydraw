import styles from './LoginWithQR.module.scss';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import HTag from '@/components/ui/HTag/HTag';

const LoginWithQR = () => {
	return (
		<div className={styles.LoginWithQR}>
			<HTag tag="h2" className={authSharedStyles.Title}>
				Log in with QR code
			</HTag>
			<div className={styles.QRcodeWrapper}>
				<div className={styles.QRcode}></div>
			</div>
			<ul className={styles.QRcodeInfo}>
				<li className={styles.InfoStep}>1. Scan with your mobile device's camera</li>
				<li className={styles.InfoStep}>2. Confirm login or sign up</li>
			</ul>
		</div>
	);
};

export default LoginWithQR;
