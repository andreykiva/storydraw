import { ObjectType, Field } from '@nestjs/graphql';
import { Drawing } from 'src/drawings/entities/drawing.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stories' })
@ObjectType()
export class Story {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	@Column({ name: 'music_id', nullable: true })
	@Field({ nullable: true })
	musicId?: string;

	@Column({ default: '' })
	@Field()
	title: string;

	@Column({ default: '' })
	@Field()
	description: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@ManyToOne(() => User, (user) => user.stories)
	@Field(() => User)
	user: User;

	@OneToMany(() => Drawing, (drawing) => drawing.story)
	@Field(() => [Drawing])
	drawings: Drawing[];
}
