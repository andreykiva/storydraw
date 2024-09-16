import styles from './SettingsSubsection.module.scss';
import HTag from '@/components/ui/HTag/HTag';

type SettingsSubsectionProps = {
	title: string;
	children: React.ReactNode;
};

const SettingsSubsection = ({ title, children }: SettingsSubsectionProps) => {
	return (
		<section className={styles.SettingsSubsection}>
			<HTag tag="h5" className={styles.SubsectionTitle}>
				{title}
			</HTag>
			{children}
		</section>
	);
};

export default SettingsSubsection;
