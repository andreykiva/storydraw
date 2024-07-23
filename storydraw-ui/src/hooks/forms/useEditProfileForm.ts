import { useState, useEffect } from 'react';
import { validateProfile } from '@/utils/validators/profileValidators';
import { EDIT_PROFILE_FIELD } from '@/constants/profile';
import User from '@/types/User';
import { formatBio } from '@/utils/formatUtils';
import { validateUsername, validateName, validateBio } from '@/utils/validators/commonValidators';

type FormData = Record<EDIT_PROFILE_FIELD, string>;
type FormErrors = Record<EDIT_PROFILE_FIELD, string>;

const useEditProfileForm = (user: User) => {
	const [formData, setFormData] = useState<FormData>({
		[EDIT_PROFILE_FIELD.USERNAME]: '',
		[EDIT_PROFILE_FIELD.DISPLAYNAME]: '',
		[EDIT_PROFILE_FIELD.BIO]: '',
	});

	const [formErrors, setFormErrors] = useState<FormErrors>({
		[EDIT_PROFILE_FIELD.USERNAME]: '',
		[EDIT_PROFILE_FIELD.DISPLAYNAME]: '',
		[EDIT_PROFILE_FIELD.BIO]: '',
	});

	useEffect(() => {
		setFormData({
			[EDIT_PROFILE_FIELD.USERNAME]: user?.username || '',
			[EDIT_PROFILE_FIELD.DISPLAYNAME]: user?.displayName || '',
			[EDIT_PROFILE_FIELD.BIO]: user?.bio || '',
		});
	}, [user]);

	const isUsernameInvalid = validateUsername(formData[EDIT_PROFILE_FIELD.USERNAME]);
	const isNameInvalid = validateName(formData[EDIT_PROFILE_FIELD.DISPLAYNAME]);
	const isBioInvalid = validateBio(formData[EDIT_PROFILE_FIELD.BIO]);

	let isFormBtnDisabled = Boolean(isUsernameInvalid || isNameInvalid || isBioInvalid);

	if (user && !isFormBtnDisabled) {
		isFormBtnDisabled =
			formData[EDIT_PROFILE_FIELD.USERNAME] === user.username &&
			formData[EDIT_PROFILE_FIELD.DISPLAYNAME] === user.displayName &&
			formData[EDIT_PROFILE_FIELD.BIO] === user.bio;
	}

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleChangeBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;

		setFormData({
			...formData,
			bio: formatBio(value),
		});
	};

	const handleBlurInput = (fieldName: EDIT_PROFILE_FIELD) => {
		const fieldError = validateProfile(fieldName, formData[fieldName]);

		setFormErrors({
			...formErrors,
			[fieldName]: fieldError || '',
		});
	};

	return {
		formData,
		formErrors,
		isFormBtnDisabled,
		handleChangeInput,
		handleChangeBio,
		handleBlurInput,
	};
};

export default useEditProfileForm;
