import { User } from 'src/users/entities/user.entity';
import { CreateStoryInput } from './dto/create-story.input';
import { Story } from './entities/story.entity';
import { PaginationInput } from 'src/common/dto/pagination.dto';

/**
 * Interface for the Stories Service.
 *
 * This interface defines the contract for managing stories,
 * including their creation, retrieval, and user-specific story management.
 */
export interface StoriesServiceInterface {
	/**
	 * Creates a new story based on the provided input and associated user.
	 * @param createStoryInput - The input data for the new story.
	 * @param user - The user creating the story.
	 * @returns A promise that resolves to the created story.
	 */
	create(createStoryInput: CreateStoryInput, user: User): Promise<Story>;

	/**
	 * Retrieves all stories with optional pagination.
	 * @param paginationInput - The pagination input specifying limit and cursor.
	 * @returns A promise that resolves to an array of stories.
	 */
	findAll(paginationInput: PaginationInput): Promise<Story[]>;

	/**
	 * Retrieves a specific story by its ID.
	 * @param id - The ID of the story to retrieve.
	 * @returns A promise that resolves to the story if found, or null if not.
	 */
	findOneById(id: string): Promise<Story | null>;

	/**
	 * Retrieves all stories created by a specific user with optional pagination.
	 * @param userId - The ID of the user whose stories to retrieve.
	 * @param paginationInput - The pagination input specifying limit and cursor.
	 * @returns A promise that resolves to an array of stories created by the user.
	 */
	findAllByUserId(userId: string, paginationInput: PaginationInput): Promise<Story[]>;

	/**
	 * Retrieves the author of a specific story.
	 * @param storyId - The ID of the story whose author to retrieve.
	 * @returns A promise that resolves to the user who authored the story.
	 */
	getStoryAuthor(storyId: string): Promise<User>;
}
