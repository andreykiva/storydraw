import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMetadataResolver } from './user-metadata.resolver';
import { UserMetadataService } from './services/user-metadata.service';
import { UserMetadata } from './entities/user-metadata.entity';
import { USER_METADATA_SERVICE } from 'src/common/constants/providers.constants';

@Module({
	imports: [TypeOrmModule.forFeature([UserMetadata])],
	providers: [
		UserMetadataResolver,
		{
			provide: USER_METADATA_SERVICE,
			useClass: UserMetadataService,
		},
	],
	exports: [USER_METADATA_SERVICE],
})
export class UserMetadataModule {}
