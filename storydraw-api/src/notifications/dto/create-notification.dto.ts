import { User } from 'src/users/entities/user.entity';
import { NotificationType } from '../enums/entity-type.enum';

export class CreateNotificationDto {
	type: NotificationType;
	user: User;
	entityId: string;
}
