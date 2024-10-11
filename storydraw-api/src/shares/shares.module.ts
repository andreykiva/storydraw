import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharesResolver } from './shares.resolver';
import { SharesService } from './services/shares.service';
import { Share } from './entities/share.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
	imports: [TypeOrmModule.forFeature([Share]), CommonModule],
	providers: [SharesResolver, SharesService],
	exports: [SharesService],
})
export class SharesModule {}
