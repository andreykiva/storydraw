import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Notification } from 'src/notifications/entities/notification.entity';

@Entity('follows')
@ObjectType()
export class Follow {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	@ManyToOne(() => User, (user) => user.following)
	@Field(() => User)
	follower: User;

	@ManyToOne(() => User, (user) => user.followers)
	@Field(() => User)
	following: User;

	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;

	@OneToOne(() => Notification, (notification) => notification.follow, { cascade: true, onDelete: 'CASCADE' })
	notification: Notification;
}
