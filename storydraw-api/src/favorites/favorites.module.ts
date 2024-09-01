import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { FavoritesResolver } from './favorites.resolver';
import { FavoritesService } from './services/favorites.service';
import { UsersModule } from 'src/users/users.module';
import { CommonModule } from 'src/common/common.module';

@Module({
	imports: [TypeOrmModule.forFeature([Favorite]), CommonModule, UsersModule],
	providers: [FavoritesResolver, FavoritesService],
	exports: [FavoritesService],
})
export class FavoritesModule {}
