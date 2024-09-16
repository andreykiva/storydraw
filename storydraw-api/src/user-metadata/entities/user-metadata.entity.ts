import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('user_metadata')
@ObjectType()
export class UserMetadata {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	@Column({ type: 'timestamp', nullable: true })
	lastNotificationsViewed: Date;

	@Column({ type: 'timestamp', nullable: true })
	lastUsernameChange: Date;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@OneToOne(() => User, (user) => user.metadata, { onDelete: 'CASCADE' })
	@JoinColumn()
	user: User;
}

// @Column({ type: 'varchar', length: 50 })
// registrationMethod: string;
