import React from 'react';
import styles from './EditProfileModal.module.scss';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import HTag from '@/components/ui/HTag/HTag';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';
import Button from '@/components/ui/buttons/Button/Button';
import User from '@/types/User';
import defaultImg from '@/assets/images/default.svg?url';
import editPfpIcon from '@/assets/icons/profile/edit-pfp.svg?url';
import Input from '@/components/ui/inputs/Input/Input';
import useEditProfileForm from '@/hooks/forms/useEditProfileForm';
import { EDIT_PROFILE_FIELD } from '@/constants/profile';
import Textarea from '@/components/ui/inputs/Textarea/Textarea';

type EditProfileModalProps = {
	user: User;
	onClose: () => void;
};

const EditProfileModal = ({ user, onClose }: EditProfileModalProps) => {
	const { formData, formErrors, isFormBtnDisabled, handleChangeInput, handleChangeBio, handleBlurInput } =
		useEditProfileForm(user);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Submit');
		onClose();
	};

	if (!user) return null;

	return (
		<ModalOverlay>
			<form className={styles.EditProfileModal} onSubmit={handleSubmit}>
				<div className={styles.ModalHeader}>
					<HTag tag="h3" className={styles.ModalTitle}>
						Edit profile
					</HTag>
					<CloseButton onClick={onClose} />
				</div>
				<div className={styles.ModalBody}>
					<div className={styles.EditProfileItem}>
						<span className={styles.ItemTitle}>Profile picture</span>
						<div className={styles.EditProfilePicture}>
							<img src={user.imageUrl || defaultImg} alt="Profile" className={styles.ProfileImg} />
							<div className={styles.EditIcon}>
								<img src={editPfpIcon} alt="Edit PFP" />
							</div>
						</div>
					</div>
					<div className={styles.EditProfileItem}>
						<span className={styles.ItemTitle}>Username</span>
						<div className={styles.ItemContent}>
							<Input
								type="text"
								name={EDIT_PROFILE_FIELD.USERNAME}
								placeholder="Username"
								value={formData[EDIT_PROFILE_FIELD.USERNAME]}
								error={formErrors[EDIT_PROFILE_FIELD.USERNAME]}
								maxLength={32}
								onChange={handleChangeInput}
								onBlur={() => handleBlurInput(EDIT_PROFILE_FIELD.USERNAME)}
								required
							/>
							<span className={styles.Username}>
								www.storydraw.com/@{formData[EDIT_PROFILE_FIELD.USERNAME]}
							</span>
							<p className={styles.ContentDescr}>
								Usernames can only contain letters, numbers, underscores, and periods. Changing your
								username will also change your profile link.
							</p>
						</div>
					</div>
					<div className={styles.EditProfileItem}>
						<span className={styles.ItemTitle}>Name</span>
						<div className={styles.ItemContent}>
							<Input
								type="text"
								name={EDIT_PROFILE_FIELD.DISPLAYNAME}
								placeholder="Name"
								value={formData[EDIT_PROFILE_FIELD.DISPLAYNAME]}
								error={formErrors[EDIT_PROFILE_FIELD.DISPLAYNAME]}
								maxLength={30}
								onChange={handleChangeInput}
								onBlur={() => handleBlurInput(EDIT_PROFILE_FIELD.DISPLAYNAME)}
								required
							/>
							<p className={styles.ContentDescr}>Your nickname can only be changed once every 7 days.</p>
						</div>
					</div>
					<div className={styles.EditProfileItem}>
						<span className={styles.ItemTitle}>Bio</span>
						<div className={styles.ItemContent}>
							<Textarea
								name={EDIT_PROFILE_FIELD.BIO}
								placeholder="Bio"
								rows={5}
								wrap="hard"
								maxLength={80}
								value={formData[EDIT_PROFILE_FIELD.BIO]}
								error={formErrors[EDIT_PROFILE_FIELD.BIO]}
								onChange={handleChangeBio}
								onBlur={() => handleBlurInput(EDIT_PROFILE_FIELD.BIO)}
							/>
							<span className={styles.ContentDescr}>{formData[EDIT_PROFILE_FIELD.BIO]?.length}/80</span>
						</div>
					</div>
				</div>
				<div className={styles.ModalFooter}>
					<Button className={styles.CancelBtn} onClick={onClose}>
						Cancel
					</Button>
					<Button className={styles.SaveBtn} type="submit" disabled={isFormBtnDisabled}>
						Save
					</Button>
				</div>
			</form>
		</ModalOverlay>
	);
};

export default EditProfileModal;
