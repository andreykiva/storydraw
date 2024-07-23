import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drawing } from '../entities/drawing.entity';
import { CreateDrawingInput } from '../dto/create-drawing.input';
import { User } from 'src/users/entities/user.entity';
import { StoriesService } from 'src/stories/services/stories.service';
import { STORY_NOT_FOUND_ERROR } from 'src/stories/constants/stories.constants';

@Injectable()
export class DrawingsService {
	constructor(
		@InjectRepository(Drawing) private drawingsRepository: Repository<Drawing>,
		private storiesService: StoriesService,
	) {}

	async create(createDrawingInput: CreateDrawingInput, user: User): Promise<Drawing> {
		const story = await this.storiesService.findOne(createDrawingInput.storyId);

		if (!story) {
			throw new BadRequestException({ story: STORY_NOT_FOUND_ERROR });
		}

		const newDrawing = this.drawingsRepository.create({
			...createDrawingInput,
			user,
			story,
		});

		return this.drawingsRepository.save(newDrawing);
	}
}
