import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

/**
 * Represents metadata associated with a user, including notification timestamps and username changes.
 */
@Entity('user_metadata')
@ObjectType()
export class UserMetadata {
	/**
	 * Unique identifier for the UserMetadata record.
	 */
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	/**
	 * Timestamp of the last notifications viewed by the user.
	 * Nullable if the user has not viewed any notifications.
	 */
	@Column({ type: 'timestamp', nullable: true })
	lastNotificationsViewed: Date;

	/**
	 * Timestamp of the last username change by the user.
	 * Nullable if the user has not changed their username.
	 */
	@Column({ type: 'timestamp', nullable: true })
	lastUsernameChange: Date;

	/**
	 * Timestamp of when the UserMetadata record was created.
	 */
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	/**
	 * The user associated with this metadata.
	 * This establishes a one-to-one relationship with the User entity.
	 * The record will be deleted if the associated user is deleted.
	 */
	@OneToOne(() => User, (user) => user.metadata, { onDelete: 'CASCADE' })
	@JoinColumn()
	user: User;
}

// @Column({ type: 'varchar', length: 50 })
// registrationMethod: string;
