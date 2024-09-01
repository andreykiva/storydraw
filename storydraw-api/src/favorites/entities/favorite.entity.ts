import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Story } from 'src/stories/entities/story.entity';

@Entity('favorites')
@ObjectType()
export class Favorite {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	@ManyToOne(() => User, (user) => user.favorites)
	@Field(() => User)
	user: User;

	@ManyToOne(() => Story, (story) => story.favorites)
	@Field(() => Story)
	story: Story;

	@CreateDateColumn({ name: 'created_at' })
	@Field()
	createdAt: Date;
}
