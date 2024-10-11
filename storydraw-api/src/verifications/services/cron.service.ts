import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { VerificationsServiceInterface } from '../verifications.service.interface';
import { VERIFICATIONS_SERVICE } from 'src/common/constants/providers.constants';

/**
 * Service that manages scheduled tasks related to verifications.
 * It uses a cron job to periodically clean up old verification entries.
 */
@Injectable()
export class CronService {
	constructor(@Inject(VERIFICATIONS_SERVICE) private readonly verificationsService: VerificationsServiceInterface) {}

	/**
	 * Cron job that runs every minute to delete old verification entries.
	 * This method invokes the removeOld method of the VerificationsService.
	 */
	@Cron(CronExpression.EVERY_MINUTE)
	async handleCron() {
		await this.verificationsService.removeOld();
	}
}
