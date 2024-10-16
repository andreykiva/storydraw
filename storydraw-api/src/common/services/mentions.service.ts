import { Injectable } from '@nestjs/common';
import { MENTION_PATTERN } from '../constants/regexp.constants';
import { RepositoryService } from './repository.service';
import { User } from 'src/users/entities/user.entity';

/**
 * Service for managing mentions in text.
 * It extracts mentioned usernames and retrieves user details from the repository.
 */
@Injectable()
export class MentionsService {
	constructor(private readonly repositoryService: RepositoryService) {}

	/**
	 * Extracts mentioned usernames from the given text.
	 *
	 * @param text - The text from which to extract mentions.
	 * @returns An array of usernames mentioned in the text.
	 */
	extractMentions(text: string): string[] {
		const matches = text.match(MENTION_PATTERN);

		if (!matches) {
			return [];
		}

		return matches.map((mention) => mention.substring(1));
	}

	/**
	 * Retrieves user entities based on the provided usernames.
	 *
	 * @param usernames - An array of usernames to find in the repository.
	 * @returns A promise that resolves to an array of User entities.
	 */
	async getMentionedUsers(usernames: string[]): Promise<User[]> {
		const uniqueUsernames = Array.from(new Set(usernames));

		if (uniqueUsernames.length === 0) {
			return [];
		}

		const users = await this.repositoryService.getUsersByUsernames(uniqueUsernames);

		const existingUsernames = new Set(users.map((user) => user.username));

		return users.filter((user) => existingUsernames.has(user.username));
	}
}
