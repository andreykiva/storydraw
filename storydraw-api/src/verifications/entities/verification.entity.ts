import { ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'verifications' })
@ObjectType()
export class Verification {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	identifier: string;

	@Column()
	code: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;
}
