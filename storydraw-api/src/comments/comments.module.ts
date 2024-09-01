import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './services/comments.service';
import { CommonModule } from 'src/common/common.module';
import { LikesModule } from 'src/likes/likes.module';

@Module({
	imports: [TypeOrmModule.forFeature([Comment]), CommonModule, LikesModule],
	providers: [CommentsResolver, CommentsService],
	exports: [CommentsService],
})
export class CommentsModule {}
