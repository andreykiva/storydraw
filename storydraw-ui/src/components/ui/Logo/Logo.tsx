import styles from './Logo.module.scss';
import logoImg from '@/assets/images/logo.png';
import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<div className={styles.Logo}>
			<Link to="/" className={styles.LogoLink}>
				<img src={logoImg} alt="StoryDraw Logo" className={styles.LogoImg} />
			</Link>
		</div>
	);
};

export default Logo;
