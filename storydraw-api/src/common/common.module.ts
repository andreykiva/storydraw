import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryService } from './services/repository.service';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Follow } from 'src/follows/entities/follow.entity';
import { MentionsService } from './services/mentions.service';

@Module({
	imports: [TypeOrmModule.forFeature([Story, User, Comment, Like, Follow])],
	providers: [RepositoryService, MentionsService],
	exports: [RepositoryService, MentionsService],
})
export class CommonModule {}
