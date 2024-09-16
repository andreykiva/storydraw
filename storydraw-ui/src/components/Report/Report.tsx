import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Report.module.scss';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';
import { reportCategories } from '@/data/reportCategories';
import HTag from '@/components/ui/HTag/HTag';
import Button from '@/components/ui/buttons/Button/Button';
import ReportCategory from './ReportCategory/ReportCategory';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import { selectReportType, selectReportTargetId, closeReport } from '@/features/report/reportSlice';

type ReportCategory = {
	id: string;
	name: string;
	subcategories?: ReportCategory[];
};

const Report = () => {
	const dispatch = useDispatch();
	const type = useSelector(selectReportType);
	const targetId = useSelector(selectReportTargetId);

	const [activeCategoryId, setActiveCategoryId] = useState(null);
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);

	const activeCategory = reportCategories.find((category) => category.id === activeCategoryId);
	const activeSubcategories = activeCategory ? activeCategory.subcategories : [];

	const activeCategories = !activeCategoryId ? reportCategories : activeSubcategories;

	const handleSubmitReport = () => {
		handleCloseReport();
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

	const handleCloseReport = () => {
		dispatch(closeReport());
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
					<CloseButton className={styles.CloseBtn} onClick={handleCloseReport} />
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
								onClick={() => handleSelectCategory(category.id)}
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
