import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMetadata } from '../entities/user-metadata.entity';
import { User } from 'src/users/entities/user.entity';
import { USER_METADATA_NOT_FOUND } from 'src/common/constants/errors.constants';

@Injectable()
export class UserMetadataService {
	constructor(@InjectRepository(UserMetadata) private readonly userMetadataRepository: Repository<UserMetadata>) {}

	async createUserMetadata(user: User): Promise<UserMetadata> {
		const newUserMetadata = this.userMetadataRepository.create({
			lastNotificationsViewed: null,
			lastUsernameChange: null,
			user,
		});

		return this.userMetadataRepository.save(newUserMetadata);
	}

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

	async getUserMetadata(userId: string): Promise<UserMetadata> {
		return this.userMetadataRepository.findOne({
			where: { user: { id: userId } },
		});
	}
}
