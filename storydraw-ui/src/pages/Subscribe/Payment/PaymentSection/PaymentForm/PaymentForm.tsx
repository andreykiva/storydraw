import React, { useEffect } from 'react';
import styles from './PaymentForm.module.scss';
import type { Plan } from '@/types/Subscription';
import { PAYMENT_METHOD } from '@/constants/subscription';
import Button from '@/components/ui/buttons/Button/Button';
import CardNumberInput from '@/components/ui/inputs/CardNumberInput/CardNumberInput';
import { PAYMENT_FIELD } from '@/constants/subscription';
import usePaymentForm from '@/hooks/forms/usePaymentForm';
import ExpirationDateInput from '@/components/ui/inputs/ExpirationDateInput/ExpirationDateInput';
import CVCCodeInput from '@/components/ui/inputs/CVCCodeInput/CVCCodeInput';
import CountrySelector from '@/components/CountrySelector/CountrySelector';

type PaymentFormProps = {
	paymentMethod: PAYMENT_METHOD;
	currentPlan: Plan;
};

const PaymentForm = ({ paymentMethod, currentPlan }: PaymentFormProps) => {
	const {
		formData,
		formErrors,
		country,
		isFormBtnDisabled,
		handleChangeCardNumber,
		handleChangeExpirationDate,
		handleChangeCVCCode,
		handleChangeCountry,
		handleBlurInput,
		resetForm,
	} = usePaymentForm();

	useEffect(() => {
		resetForm();
	}, [paymentMethod, resetForm]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Submit');
	};

	return (
		<form className={styles.PaymentForm} onSubmit={handleSubmit}>
			{paymentMethod === PAYMENT_METHOD.ANOTHER_CARD && (
				<>
					<div className={styles.FormField}>
						<label className={styles.FieldLabel} htmlFor={PAYMENT_FIELD.CARD_NUMBER}>
							Card number
						</label>
						<CardNumberInput
							name={PAYMENT_FIELD.CARD_NUMBER}
							id={PAYMENT_FIELD.CARD_NUMBER}
							value={formData[PAYMENT_FIELD.CARD_NUMBER]}
							error={formErrors[PAYMENT_FIELD.CARD_NUMBER]}
							onChange={handleChangeCardNumber}
							onBlur={() => handleBlurInput(PAYMENT_FIELD.CARD_NUMBER)}
							required
						/>
					</div>
					<div className={styles.FormFieldsBottom}>
						<div className={styles.FormField}>
							<label className={styles.FieldLabel} htmlFor={PAYMENT_FIELD.EXPIRATION_DATE}>
								Expiration date
							</label>
							<ExpirationDateInput
								id={PAYMENT_FIELD.EXPIRATION_DATE}
								name={PAYMENT_FIELD.EXPIRATION_DATE}
								value={formData[PAYMENT_FIELD.EXPIRATION_DATE]}
								error={formErrors[PAYMENT_FIELD.EXPIRATION_DATE]}
								onChange={handleChangeExpirationDate}
								onBlur={() => handleBlurInput(PAYMENT_FIELD.EXPIRATION_DATE)}
								required
							/>
						</div>
						<div className={styles.FormField}>
							<label className={styles.FieldLabel} htmlFor={PAYMENT_FIELD.CVC_CODE}>
								CVC
							</label>
							<CVCCodeInput
								name={PAYMENT_FIELD.CVC_CODE}
								id={PAYMENT_FIELD.CVC_CODE}
								value={formData[PAYMENT_FIELD.CVC_CODE]}
								error={formErrors[PAYMENT_FIELD.CVC_CODE]}
								onChange={handleChangeCVCCode}
								onBlur={() => handleBlurInput(PAYMENT_FIELD.CVC_CODE)}
								required
							/>
						</div>
					</div>
					<div className={styles.FormField}>
						<label className={styles.FieldLabel} htmlFor="country">
							Country
						</label>
						<CountrySelector selectedOption={country} selectOption={handleChangeCountry} />
					</div>
					<p className={styles.PaymentDescr}>
						By providing your card information, you authorize StoryDraw to charge your card for this and
						future payments according to StoryDraw's terms and conditions.
					</p>
				</>
			)}

			<Button className={styles.TryBtn} type="submit" disabled={isFormBtnDisabled}>
				Try {currentPlan.trialDays} days for free
			</Button>
		</form>
	);
};

export default PaymentForm;
