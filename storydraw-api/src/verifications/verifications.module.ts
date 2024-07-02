import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { VerificationsService } from './verifications.service';

@Module({
	imports: [TypeOrmModule.forFeature([Verification])],
	providers: [VerificationsService],
	exports: [VerificationsService],
})
export class VerificationsModule {}
