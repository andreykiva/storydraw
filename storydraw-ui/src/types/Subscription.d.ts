import { SUBSCRIPTION_PLAN } from '@/constants/subscription';

export type Plan = {
	name: string;
	pricePerMonth: number;
	pricePerYear?: number;
	trialDays: number;
	type: SUBSCRIPTION_PLAN;
	category?: string;
};
