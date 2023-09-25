import React from 'react';
import styles from './BirthdaySelector.module.css';
import DateSelector from './DateSelector/DateSelector';
import months from '@/data/months';

type BirthdaySelector = {
	selectedMonth: string;
	selectedDay: string;
	selectedYear: string;
	selectBirthday: (fieldName: string, selectedDate: string) => void;
};

const BirthdaySelector = ({ selectedMonth, selectedDay, selectedYear, selectBirthday }: BirthdaySelector) => {
	const monthNames = months.map((month) => month.name);

	const daysLength = selectedMonth ? months.find((month) => month.name === selectedMonth).days : 31;
	const days = Array.from({ length: daysLength }, (_, index) => (index + 1).toString());

	const previousYear = new Date().getFullYear() - 1;
	const startYear = 1900;
	const years = [];

	for (let year = previousYear; year >= startYear; year--) {
		years.push(year.toString());
	}

	return (
		<div className={styles.BirthdaySelector}>
			<span className={styles.SelectorTitle}>When's your birthday?</span>
			<div className={styles.Selectors}>
				<DateSelector
					options={monthNames}
					selectOption={selectBirthday}
					fieldName="birthMonth"
					placeholder="Month"
					selectedOption={selectedMonth}
				/>
				<DateSelector
					options={days}
					selectOption={selectBirthday}
					fieldName="birthDay"
					placeholder="Day"
					selectedOption={selectedDay}
				/>
				<DateSelector
					options={years}
					selectOption={selectBirthday}
					fieldName="birthYear"
					placeholder="Year"
					selectedOption={selectedYear}
				/>
			</div>
			<span className={styles.SelectorDescr}>Your birthday won't be shown publicly.</span>
		</div>
	);
};

export default BirthdaySelector;
