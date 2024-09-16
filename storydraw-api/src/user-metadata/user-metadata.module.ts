import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMetadataResolver } from './user-metadata.resolver';
import { UserMetadataService } from './services/user-metadata.service';
import { UserMetadata } from './entities/user-metadata.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserMetadata])],
	providers: [UserMetadataResolver, UserMetadataService],
	exports: [UserMetadataService],
})
export class UserMetadataModule {}
