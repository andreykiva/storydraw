import { EDIT_PROFILE_FIELD } from '@/constants/profile';
import type { ValidatorFunction } from './commonValidators';
import { validateUsername, validateName, validateBio } from './commonValidators';

type ProfileValidators = Record<EDIT_PROFILE_FIELD, ValidatorFunction>;

const profileValidators: ProfileValidators = {
	[EDIT_PROFILE_FIELD.USERNAME]: validateUsername,
	[EDIT_PROFILE_FIELD.DISPLAYNAME]: validateName,
	[EDIT_PROFILE_FIELD.BIO]: validateBio,
};

export const validateProfile = (key: EDIT_PROFILE_FIELD, value: string): string | null => {
	const validator = profileValidators[key];

	if (validator) {
		return validator(value);
	}

	throw new Error('Invalid validation key');
};
