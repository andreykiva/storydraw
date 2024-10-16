import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { VerificationsService } from './verifications.service';

/**
 * Service that manages scheduled tasks related to verifications.
 * It uses a cron job to periodically clean up old verification entries.
 */
@Injectable()
export class CronService {
	constructor(private readonly verificationsService: VerificationsService) {}

	/**
	 * Cron job that runs every minute to delete old verification entries.
	 * This method invokes the removeOld method of the VerificationsService.
	 */
	@Cron(CronExpression.EVERY_MINUTE)
	async handleCron() {
		await this.verificationsService.removeOld();
	}
}
