import React, { useState } from 'react';
import styles from './Report.module.css';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';
import { reportCategories } from '@/data/reportCategories';
import HTag from '@/components/ui/HTag/HTag';
import Button from '@/components/ui/buttons/Button/Button';
import ReportCategory from './ReportCategory/ReportCategory';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import ArrowIcon from '@/assets/icons/arrow.svg';

type ReportCategory = {
	id: string;
	name: string;
	subcategories?: ReportCategory[];
};

type ReportProps = {
	type: 'video' | 'account' | 'comment';
	targetId: string;
	onClose?: () => void;
};

const Report = (props: ReportProps) => {
	const { type, targetId, onClose } = props;
	const [activeCategoryId, setActiveCategoryId] = useState(null);
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);

	const activeCategory = reportCategories.find((category) => category.id === activeCategoryId);
	const activeSubcategories = activeCategory ? activeCategory.subcategories : [];

	const activeCategories = !activeCategoryId ? reportCategories : activeSubcategories;

	const handleSubmitReport = () => {
		console.log(`Type: ${type}, ID: ${targetId}, CategoryId: ${selectedCategoryId}`);
	};

	const handleSelectCategory = (categoryId: string) => {
		if (activeCategoryId) {
			setSelectedCategoryId(categoryId);
		} else {
			setActiveCategoryId(categoryId);
		}
	};

	const handleBack = () => {
		setSelectedCategoryId(null);
		setActiveCategoryId(null);
	};

	return (
		<ModalOverlay>
			<div className={styles.Report}>
				<div className={styles.ReportHeader}>
					{activeCategoryId && (
						<RoundButton className={styles.BackBtn} onClick={handleBack}>
							<ArrowIcon className={styles.ArrowIcon} />
						</RoundButton>
					)}
					<HTag tag="h3" className={styles.ReportTitle}>
						Report
					</HTag>
					<CloseButton className={styles.CloseBtn} onClick={onClose} />
				</div>
				<div className={styles.ReportBody}>
					<span className={styles.ReportNote}>Please select a scenario</span>
					<ul className={styles.ReportCategories}>
						{activeCategories.map((category: ReportCategory) => (
							<ReportCategory
								key={category.id}
								name={category.name}
								selected={category.id === selectedCategoryId}
								hasSubcategories={category.subcategories && category.subcategories.length > 0}
								onClick={handleSelectCategory.bind(this, category.id)}
							/>
						))}
					</ul>
				</div>
				<div className={styles.ReportFooter}>
					<Button className={styles.SubmitBtn} onClick={handleSubmitReport} disabled={!selectedCategoryId}>
						Submit
					</Button>
				</div>
			</div>
		</ModalOverlay>
	);
};

export default Report;
