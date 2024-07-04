import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Verification } from '../entities/verification.entity';
import { generateRandomNumber } from 'src/common/utils/numberUtils';
import { IVerificationsService } from '../verifications.interface';
import { INVALID_CODE_ERROR, TRY_LATER_ERROR } from '../constants/verifications.constants';

@Injectable()
export class VerificationsService implements IVerificationsService {
	constructor(
		@InjectRepository(Verification)
		private verificationsRepository: Repository<Verification>,
	) {}

	async create(identifier: string): Promise<Verification> {
		const verification = await this.findOne(identifier);

		if (verification) {
			throw new BadRequestException(TRY_LATER_ERROR);
		}

		const code = generateRandomNumber(6, 6);
		const newVerification = this.verificationsRepository.create({ identifier, code });

		return this.verificationsRepository.save(newVerification);
	}

	async confirmCode(identifier: string, code: string): Promise<void> {
		const verification = await this.findOne(identifier);

		if (!verification) {
			throw new BadRequestException('Verification record not found');
		}

		await this.delete(verification);

		if (verification.code !== code) {
			throw new BadRequestException(INVALID_CODE_ERROR);
		}
	}

	async findOne(identifier: string): Promise<Verification> {
		return this.verificationsRepository.findOne({ where: { identifier } });
	}

	async delete(verificationCode: Verification): Promise<void> {
		await this.verificationsRepository.remove(verificationCode);
	}

	async deleteOld(): Promise<void> {
		const date = new Date();
		date.setMinutes(date.getMinutes() - 1);
		await this.verificationsRepository.delete({ createdAt: LessThan(date) });
	}
}
