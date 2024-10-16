import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drawing } from '../entities/drawing.entity';
import { CreateDrawingInput } from '../dto/create-drawing.input';
import { User } from 'src/users/entities/user.entity';
import { STORY_NOT_FOUND_ERROR } from 'src/common/constants/errors.constants';
import { RepositoryService } from 'src/common/services/repository.service';
import { DrawingsServiceInterface } from '../drawings.service.interface';

/**
 * Service for managing drawings associated with stories.
 */
@Injectable()
export class DrawingsService implements DrawingsServiceInterface {
	constructor(
		@InjectRepository(Drawing) private readonly drawingsRepository: Repository<Drawing>,
		private readonly repositoryService: RepositoryService,
	) {}

	/**
	 * Creates a new drawing associated with a specific story.
	 *
	 * @param createDrawingInput - Input data for creating the drawing, including the story ID and image URL.
	 * @param user - The user creating the drawing.
	 * @returns A Promise resolving to the newly created Drawing object.
	 * @throws NotFoundException if the specified story is not found.
	 */
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

	/**
	 * Retrieves all drawings associated with a specific story.
	 *
	 * @param storyId - The ID of the story for which to retrieve drawings.
	 * @returns A Promise resolving to an array of Drawing objects associated with the story.
	 */
	async findAllByStoryId(storyId: string): Promise<Drawing[]> {
		return this.drawingsRepository.find({ where: { story: { id: storyId } } });
	}
}
