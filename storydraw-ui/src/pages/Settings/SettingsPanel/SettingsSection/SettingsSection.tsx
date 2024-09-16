import styles from './SettingsSection.module.scss';
import HTag from '@/components/ui/HTag/HTag';

type SettingsSectionProps = {
	title: string;
	id?: string;
	children: React.ReactNode;
};

const SettingsSection = ({ title, id, children }: SettingsSectionProps) => {
	return (
		<section className={styles.SettingsSection} id={id}>
			<HTag tag="h4" className={styles.SectionTitle}>
				{title}
			</HTag>
			<div className={styles.SectionContent}>{children}</div>
		</section>
	);
};

export default SettingsSection;
