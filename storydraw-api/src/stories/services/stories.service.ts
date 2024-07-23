import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '../entities/story.entity';
import { DrawingsService } from 'src/drawings/services/drawings.service';
import { CreateStoryInput } from '../dto/create-story.input';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class StoriesService {
	constructor(
		@InjectRepository(Story) private storiesRepository: Repository<Story>,
		private drawingsService: DrawingsService,
	) {}

	async create(createStoryInput: CreateStoryInput, user: User): Promise<Story> {
		const newStory = this.storiesRepository.create({
			...createStoryInput,
			user,
		});

		await this.storiesRepository.save(newStory);

		const newDrawing = {
			imageUrl: createStoryInput.drawing.imageUrl,
			storyId: newStory.id,
		};

		await this.drawingsService.create(newDrawing, user);

		return newStory;
	}

	async findOne(id: string): Promise<Story> {
		return this.storiesRepository.findOneBy({ id });
	}
}
