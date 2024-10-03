import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import { validateProfile } from '@/utils/validators/profileValidators';
import { EDIT_PROFILE_FIELD } from '@/constants/profile';
import { formatBio } from '@/utils/formatUtils';
import { validateUsername, validateName, validateBio } from '@/utils/validators/commonValidators';
import { ProfileUser } from '@/types/Profile';
import { ENSURE_USERNAME_NOT_EXISTS } from '@/graphql/users/queries';
import { transformError } from '@/utils/graphqlUtils';
import { UPDATE_USER } from '@/graphql/users/mutations';
import { setUser } from '@/features/user/userSlice';

type FormData = Record<EDIT_PROFILE_FIELD, string>;
type FormErrors = Record<EDIT_PROFILE_FIELD, string>;

type UseEditProfileFormProps = {
	user: ProfileUser;
	udpateUser: (user: ProfileUser) => void;
	onClose: () => void;
};

const useEditProfileForm = ({ user, udpateUser, onClose }: UseEditProfileFormProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
			[EDIT_PROFILE_FIELD.USERNAME]: user.username,
			[EDIT_PROFILE_FIELD.DISPLAYNAME]: user.displayName,
			[EDIT_PROFILE_FIELD.BIO]: user.bio,
		});
	}, [user]);

	const [isUsernameLoading, setIsUsernameLoading] = useState(false);

	const [findUser, { loading: findUserLoading }] = useLazyQuery(ENSURE_USERNAME_NOT_EXISTS, {
		onCompleted(data) {
			if (data.ensureUsernameNotExists.exists === false) {
				setFormErrors({
					...formErrors,
					[EDIT_PROFILE_FIELD.USERNAME]: '',
				});
				setIsUsernameLoading(false);
			}
		},
		onError(error) {
			handleError(error, [EDIT_PROFILE_FIELD.USERNAME]);
			setIsUsernameLoading(false);
		},
		fetchPolicy: 'no-cache',
	});

	const [updateUser, { loading: updateUserLoading }] = useMutation(UPDATE_USER, {
		onCompleted(data) {
			udpateUser({
				...user,
				...data.updateUser,
			});
			dispatch(setUser(data.updateUser));
			navigate(`/@${data.updateUser.username}`);
			onClose();
		},
		onError(error) {
			handleError(error, [EDIT_PROFILE_FIELD.USERNAME, EDIT_PROFILE_FIELD.DISPLAYNAME, EDIT_PROFILE_FIELD.BIO]);
		},
	});

	const isUsernameInvalid = validateUsername(formData[EDIT_PROFILE_FIELD.USERNAME]);
	const isNameInvalid = validateName(formData[EDIT_PROFILE_FIELD.DISPLAYNAME]);
	const isBioInvalid = validateBio(formData[EDIT_PROFILE_FIELD.BIO]);

	let isSaveBtnDisabled = Boolean(isUsernameInvalid || isNameInvalid || isBioInvalid);

	if (user && !isSaveBtnDisabled) {
		isSaveBtnDisabled =
			formData[EDIT_PROFILE_FIELD.USERNAME] === user.username &&
			formData[EDIT_PROFILE_FIELD.DISPLAYNAME] === user.displayName &&
			formData[EDIT_PROFILE_FIELD.BIO] === user.bio;
	}

	const isUsernameError = !!formErrors[EDIT_PROFILE_FIELD.USERNAME];

	const isFormBtnDisabled = Boolean(isUsernameInvalid || findUserLoading || isUsernameError || isSaveBtnDisabled || isUsernameLoading);

	const handleFindUser = (value: string) => {
		findUser({
			variables: {
				usernameInput: {
					username: value,
				},
			},
		});
	};

	const handleError = (error: ApolloError | undefined, fields: EDIT_PROFILE_FIELD[]) => {
		const errors = transformError(error);
		if (!errors) return;

		fields.forEach((field) => {
			if (errors[field]) {
				setFormErrors((prevErrors) => ({
					...prevErrors,
					[field]: errors[field] as string,
				}));
			}
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetErrors();

		updateUser({
			variables: {
				updateUserInput: {
					username: formData[EDIT_PROFILE_FIELD.USERNAME],
					displayName: formData[EDIT_PROFILE_FIELD.DISPLAYNAME],
					bio: formData[EDIT_PROFILE_FIELD.BIO],
				},
			},
		});
	};

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === EDIT_PROFILE_FIELD.USERNAME) {
			if (value === user.username) {
				setFormErrors({
					...formErrors,
					[name]: '',
				});
				setIsUsernameLoading(false);
			} else {
				setIsUsernameLoading(true);
			}
		}

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

	const resetErrors = () => {
		setFormErrors({
			[EDIT_PROFILE_FIELD.USERNAME]: '',
			[EDIT_PROFILE_FIELD.DISPLAYNAME]: '',
			[EDIT_PROFILE_FIELD.BIO]: '',
		});
	};

	return {
		formData,
		formErrors,
		isFormBtnDisabled,
		handleChangeInput,
		handleChangeBio,
		handleBlurInput,
		handleSubmit,
		handleFindUser,
		isUsernameInputLoading: findUserLoading,
		isFormBtnLoading: updateUserLoading,
	};
};

export default useEditProfileForm;
