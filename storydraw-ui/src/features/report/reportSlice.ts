import { createSlice, createSelector } from '@reduxjs/toolkit';
import { REPORT_TYPE } from '@/constants/report';

type ReportState = {
	isReportOpen: boolean;
	type: REPORT_TYPE;
	targetId: string;
};

const initialState: ReportState = {
	isReportOpen: false,
	type: null,
	targetId: null,
};

export const reportSlice = createSlice({
	name: 'report',
	initialState,
	reducers: {
		openReport: (state, action) => {
			state.type = action.payload.type;
			state.targetId = action.payload.targetId;
			state.isReportOpen = true;
		},
		closeReport: (state) => {
			state.isReportOpen = false;
		},
	},
});

export const { openReport, closeReport } = reportSlice.actions;

export const selectReportState = (state: { report: ReportState }) => state.report;

export const selectReportStatus = createSelector([selectReportState], (report) => report.isReportOpen);
export const selectReportType = createSelector([selectReportState], (report) => report.type);
export const selectReportTargetId = createSelector([selectReportState], (report) => report.targetId);

export default reportSlice.reducer;
