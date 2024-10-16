import { User } from 'src/users/entities/user.entity';
import { CreateDrawingInput } from './dto/create-drawing.input';
import { Drawing } from './entities/drawing.entity';

/**
 * Interface for managing drawings associated with stories.
 *
 * Describes methods for creating drawings and retrieving all drawings
 * associated with a specific story.
 */
export interface DrawingsServiceInterface {
	/**
	 * Creates a new drawing associated with a story.
	 *
	 * @param createDrawingInput - Input data for creating the drawing, including the story ID and image URL.
	 * @param user - The user creating the drawing.
	 * @returns A Promise resolving to the newly created Drawing object.
	 */
	create(createDrawingInput: CreateDrawingInput, user: User): Promise<Drawing>;

	/**
	 * Retrieves all drawings associated with a specified story.
	 *
	 * @param storyId - The ID of the story for which to retrieve drawings.
	 * @returns A Promise resolving to an array of Drawing objects associated with the story.
	 */
	findAllByStoryId(storyId: string): Promise<Drawing[]>;
}
