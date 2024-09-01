import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsService } from './services/notifications.service';
import { CommonModule } from 'src/common/common.module';

@Module({
	imports: [TypeOrmModule.forFeature([Notification]), CommonModule],
	providers: [NotificationsResolver, NotificationsService],
	exports: [NotificationsService],
})
export class NotificationsModule {}
