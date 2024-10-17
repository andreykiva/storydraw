import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Verification } from '../entities/verification.entity';
import { generateRandomNumber } from 'src/common/utils/number.utils';
import { VerificationsServiceInterface } from '../verifications.service.interface';
import { INVALID_CODE_ERROR, TRY_LATER_ERROR, VERIFICATION_FAILED_ERROR } from 'src/common/constants/errors.constants';
import { IdentifierType } from '../enums/identifier-type.enum';

/**
 * Service for managing verification codes for user identifiers (phone numbers and emails).
 */
@Injectable()
export class VerificationsService implements VerificationsServiceInterface {
	constructor(
		@InjectRepository(Verification)
		private verificationsRepository: Repository<Verification>,
	) {}

	/**
	 * Creates a new verification entry for the specified identifier.
	 * Throws BadRequestException if a verification already exists for the identifier.
	 *
	 * @param identifier - The identifier (phone number or email) for which the verification is created.
	 * @param identifierType - The type of the identifier (phone, email) used for error messages.
	 * @returns A Promise resolving to the newly created Verification object.
	 * @throws BadRequestException if a verification already exists for the identifier.
	 */
	async create(identifier: string, identifierType: IdentifierType): Promise<Verification> {
		const verification = await this.findOneByIdentifier(identifier);

		if (verification) {
			throw new BadRequestException({ [identifierType]: TRY_LATER_ERROR });
		}

		const code = generateRandomNumber(6, 6);
		const newVerification = this.verificationsRepository.create({ identifier, code });

		return this.verificationsRepository.save(newVerification);
	}

	/**
	 * Confirms the provided verification code for the specified identifier.
	 * Throws BadRequestException if the verification is not found or the code is invalid.
	 *
	 * @param identifier - The identifier (phone number or email) associated with the verification.
	 * @param code - The verification code to confirm.
	 * @returns A Promise resolving when the code is confirmed.
	 * @throws BadRequestException if the verification is not found or the code is invalid.
	 */
	async confirmCode(identifier: string, code: string): Promise<void> {
		const verification = await this.findOneByIdentifier(identifier);

		if (!verification) {
			throw new BadRequestException({ code: VERIFICATION_FAILED_ERROR });
		}

		await this.remove(verification);

		if (verification.code !== code) {
			throw new BadRequestException({ code: INVALID_CODE_ERROR });
		}
	}

	/**
	 * Finds a verification entry by its identifier.
	 *
	 * @param identifier - The identifier to search for.
	 * @returns A Promise resolving to the found Verification object or null if not found.
	 */
	async findOneByIdentifier(identifier: string): Promise<Verification | null> {
		return this.verificationsRepository.findOne({ where: { identifier } });
	}

	/**
	 * Removes a verification entry from the repository.
	 *
	 * @param verificationCode - The Verification object to remove.
	 * @returns A Promise resolving when the verification is removed.
	 */
	async remove(verificationCode: Verification): Promise<void> {
		await this.verificationsRepository.remove(verificationCode);
	}

	/**
	 * Removes verification entries older than one minute.
	 *
	 * @returns A Promise resolving when old verifications are removed.
	 */
	async removeOld(): Promise<void> {
		const date = new Date();
		date.setMinutes(date.getMinutes() - 1);
		await this.verificationsRepository.delete({ createdAt: LessThan(date) });
	}
}
