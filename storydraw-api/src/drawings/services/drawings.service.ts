import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drawing } from '../entities/drawing.entity';
import { CreateDrawingInput } from '../dto/create-drawing.input';
import { User } from 'src/users/entities/user.entity';
import { STORY_NOT_FOUND_ERROR } from 'src/common/constants/errors.constants';
import { RepositoryService } from 'src/common/services/repository.service';

@Injectable()
export class DrawingsService {
	constructor(
		@InjectRepository(Drawing) private readonly drawingsRepository: Repository<Drawing>,
		private readonly repositoryService: RepositoryService,
	) {}

	async create(createDrawingInput: CreateDrawingInput, user: User): Promise<Drawing> {
		const story = await this.repositoryService.getStoryById(createDrawingInput.storyId);

		if (!story) {
			throw new NotFoundException(STORY_NOT_FOUND_ERROR);
		}

		const newDrawing = this.drawingsRepository.create({
			...createDrawingInput,
			user,
			story,
		});

		return this.drawingsRepository.save(newDrawing);
	}

	async findAll(id: string): Promise<Drawing[]> {
		return this.drawingsRepository.find({ where: { story: { id } } });
	}
}
