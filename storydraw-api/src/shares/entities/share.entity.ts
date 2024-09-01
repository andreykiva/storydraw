import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Story } from 'src/stories/entities/story.entity';

@Entity('shares')
@ObjectType()
export class Share {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	@ManyToOne(() => User, (user) => user.shares)
	@Field(() => User)
	user: User;

	@ManyToOne(() => Story, (story) => story.shares)
	@Field(() => Story)
	story: Story;

	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;
}
