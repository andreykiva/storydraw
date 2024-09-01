import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

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
}
