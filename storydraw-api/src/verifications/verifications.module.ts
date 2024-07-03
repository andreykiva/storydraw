import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { VerificationsService } from './services/verifications.service';
import { CronService } from './services/cron.service';

@Module({
	imports: [TypeOrmModule.forFeature([Verification]), ScheduleModule.forRoot()],
	providers: [VerificationsService, CronService],
	exports: [VerificationsService],
})
export class VerificationsModule {}
