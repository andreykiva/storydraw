import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Verification } from './entities/verification.entity';

@Injectable()
export class VerificationsService {
	constructor(
		@InjectRepository(Verification)
		private verificationsRepository: Repository<Verification>,
	) {}

	generateVerificationCode() {
		return Math.floor(100000 + Math.random() * 900000).toString();
	}

	async createVerification(identifier: string) {
		const code = this.generateVerificationCode();
		const verificationCode = this.verificationsRepository.create({ identifier, code });

		return this.verificationsRepository.save(verificationCode);
	}

	async findVerification(identifier: string, code: string) {
		return this.verificationsRepository.findOne({ where: { identifier, code } });
	}

	async deleteVerification(verificationCode: Verification): Promise<void> {
		await this.verificationsRepository.remove(verificationCode);
	}

	async deleteOldVerifications(): Promise<void> {
		const date = new Date();
		date.setMinutes(date.getMinutes() - 10);
		await this.verificationsRepository.delete({ createdAt: LessThan(date) });
	}
}
