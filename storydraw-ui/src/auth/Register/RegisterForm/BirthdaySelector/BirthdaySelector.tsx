import React from 'react';
import styles from './BirthdaySelector.module.scss';
import DateSelector from './DateSelector/DateSelector';
import months from '@/data/months';
import { BIRTH_FIELD } from '@/constants/auth';

type BirthdaySelector = {
	selectedMonth: string;
	selectedDay: string;
	selectedYear: string;
	selectBirthday: (fieldName: BIRTH_FIELD, selectedDate: string) => void;
};

const BirthdaySelector = ({ selectedMonth, selectedDay, selectedYear, selectBirthday }: BirthdaySelector) => {
	const monthNames = months.map((month) => month.name);

	const daysLength = selectedMonth ? months.find((month) => month.name === selectedMonth).days : 31;
	const days = Array.from({ length: daysLength }, (_, index) => (index + 1).toString());

	const twelveYearsAgo = new Date().getFullYear() - 12;
	const startYear = 1900;
	const years = [];

	for (let year = twelveYearsAgo; year >= startYear; year--) {
		years.push(year.toString());
	}

	return (
		<div className={styles.BirthdaySelector}>
			<span className={styles.SelectorTitle}>When's your birthday?</span>
			<div className={styles.Selectors}>
				<DateSelector
					options={monthNames}
					onSelectOption={selectBirthday}
					fieldName={BIRTH_FIELD.MONTH}
					placeholder="Month"
					selectedOption={selectedMonth}
				/>
				<DateSelector
					options={days}
					onSelectOption={selectBirthday}
					fieldName={BIRTH_FIELD.DAY}
					placeholder="Day"
					selectedOption={selectedDay}
				/>
				<DateSelector
					options={years}
					onSelectOption={selectBirthday}
					fieldName={BIRTH_FIELD.YEAR}
					placeholder="Year"
					selectedOption={selectedYear}
				/>
			</div>
			<span className={styles.SelectorDescr}>Your birthday won't be shown publicly.</span>
		</div>
	);
};

export default BirthdaySelector;
