import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { LikesResolver } from './likes.resolver';
import { LikesService } from './services/likes.service';
import { CommonModule } from 'src/common/common.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
	imports: [TypeOrmModule.forFeature([Like]), CommonModule, NotificationsModule],
	providers: [LikesResolver, LikesService],
	exports: [LikesService],
})
export class LikesModule {}
