import { Story } from './entities/story.entity';

export interface IStoriesService {
	test(): Promise<Story>;
}
