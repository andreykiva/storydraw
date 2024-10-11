import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { VerificationsService } from './services/verifications.service';
import { CronService } from './services/cron.service';
import { VERIFICATIONS_SERVICE } from 'src/common/constants/providers.constants';

@Module({
	imports: [TypeOrmModule.forFeature([Verification]), ScheduleModule.forRoot()],
	providers: [
		{
			provide: VERIFICATIONS_SERVICE,
			useClass: VerificationsService,
		},
		CronService,
	],
	exports: [VERIFICATIONS_SERVICE],
})
export class VerificationsModule {}
