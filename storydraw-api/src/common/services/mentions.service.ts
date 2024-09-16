import { Injectable } from '@nestjs/common';
import { MENTION_PATTERN } from '../constants/regexp.constants';
import { RepositoryService } from './repository.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MentionsService {
	constructor(private readonly repositoryService: RepositoryService) {}

	extractMentions(text: string): string[] {
		const matches = text.match(MENTION_PATTERN);

		if (!matches) {
			return [];
		}

		return matches.map((mention) => mention.substring(1));
	}

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
