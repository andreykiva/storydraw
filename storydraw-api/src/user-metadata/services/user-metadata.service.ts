import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMetadata } from '../entities/user-metadata.entity';
import { User } from 'src/users/entities/user.entity';
import { USER_METADATA_NOT_FOUND } from 'src/common/constants/errors.constants';
import { UserMetadataServiceInterface } from '../user-metadata.service.interface';

/**
 * Service for managing user metadata, including notifications and username changes.
 */
@Injectable()
export class UserMetadataService implements UserMetadataServiceInterface {
	constructor(
		@InjectRepository(UserMetadata)
		private readonly userMetadataRepository: Repository<UserMetadata>,
	) {}

	/**
	 * Creates a new UserMetadata entry for the specified user.
	 *
	 * @param user - The user for whom the metadata is created.
	 * @returns A Promise that resolves to the newly created UserMetadata object.
	 */
	async create(user: User): Promise<UserMetadata> {
		const newUserMetadata = this.userMetadataRepository.create({
			lastNotificationsViewed: null,
			lastUsernameChange: null,
			user,
		});

		return this.userMetadataRepository.save(newUserMetadata);
	}

	/**
	 * Updates the last notifications viewed timestamp for the specified user.
	 *
	 * @param userId - The ID of the user whose last notifications viewed timestamp will be updated.
	 * @returns A Promise that resolves to the updated UserMetadata object.
	 * @throws NotFoundException if no UserMetadata entry is found for the user.
	 */
	async updateLastNotificationsViewed(userId: string): Promise<UserMetadata> {
		const userMetadata = await this.userMetadataRepository.findOne({
			where: { user: { id: userId } },
		});

		if (!userMetadata) {
			throw new NotFoundException(USER_METADATA_NOT_FOUND);
		}

		userMetadata.lastNotificationsViewed = new Date();

		return this.userMetadataRepository.save(userMetadata);
	}

	/**
	 * Finds the UserMetadata entry for the specified user ID.
	 *
	 * @param userId - The ID of the user for whom metadata is to be found.
	 * @returns A Promise that resolves to the found UserMetadata object or null if not found.
	 */
	async findOneByUserId(userId: string): Promise<UserMetadata | null> {
		return this.userMetadataRepository.findOne({
			where: { user: { id: userId } },
		});
	}
}
