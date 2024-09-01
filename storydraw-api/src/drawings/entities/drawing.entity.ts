import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'drawings' })
@ObjectType()
export class Drawing {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	@Column({ name: 'image_url' })
	@Field()
	imageUrl: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@ManyToOne(() => User, (user) => user.drawings)
	@Field(() => User)
	user: User;

	@ManyToOne(() => Story, (story) => story.drawings)
	story: Story;
}
