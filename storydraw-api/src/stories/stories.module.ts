import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { StoriesResolver } from './stories.resolver';
import { StoriesService } from './services/stories.service';
import { DrawingsModule } from 'src/drawings/drawings.module';
import { LikesModule } from 'src/likes/likes.module';
import { CommentsModule } from 'src/comments/comments.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { SharesModule } from 'src/shares/shares.module';
import { CommonModule } from 'src/common/common.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Story]),
		DrawingsModule,
		LikesModule,
		CommentsModule,
		FavoritesModule,
		SharesModule,
		CommonModule,
	],
	providers: [StoriesResolver, StoriesService],
	exports: [StoriesService],
})
export class StoriesModule {}
