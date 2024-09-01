import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { NotificationType } from '../enums/entity-type.enum';

@InputType()
export class GetNotificationsInput {
	@Field(() => NotificationType)
	@IsNotEmpty()
	@IsEnum(NotificationType)
	type: NotificationType;
}

registerEnumType(NotificationType, {
	name: 'NotificationType',
	description: 'The type of notification',
});
