import { ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

/**
 * Represents a verification entry for user actions such as account creation or password resets.
 */
@Entity({ name: 'verifications' })
@ObjectType()
export class Verification {
	/**
	 * Unique identifier for the verification entry.
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * Identifier (email or phone number) for the verification.
	 */
	@Column({ unique: true })
	identifier: string;

	/**
	 * Verification code sent to the identifier.
	 */
	@Column()
	code: string;

	/**
	 * Timestamp of when the verification entry was created.
	 */
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;
}
