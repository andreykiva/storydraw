import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { StoriesResolver } from './stories.resolver';
import { StoriesService } from './services/stories.service';
import { Drawing } from './entities/drawing.entity';
import { DrawingsService } from './services/drawings.service';

@Module({
	imports: [TypeOrmModule.forFeature([Story, Drawing])],
	providers: [StoriesResolver, StoriesService, DrawingsService],
	exports: [StoriesService],
})
export class StoriesModule {}
