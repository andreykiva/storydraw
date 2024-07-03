import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { VerificationsService } from './verifications.service';

@Injectable()
export class CronService {
	constructor(private readonly verificationsService: VerificationsService) {}

	// @Cron(CronExpression.EVERY_MINUTE)
	// async handleCron() {
	// 	await this.verificationsService.deleteOldVerifications();
	// }
}
