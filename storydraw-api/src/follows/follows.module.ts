import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';
import { FollowsResolver } from './follows.resolver';
import { FollowsService } from './services/follows.service';
import { CommonModule } from 'src/common/common.module';

@Module({
	imports: [TypeOrmModule.forFeature([Follow]), CommonModule],
	providers: [FollowsResolver, FollowsService],
	exports: [FollowsService],
})
export class FollowsModule {}
