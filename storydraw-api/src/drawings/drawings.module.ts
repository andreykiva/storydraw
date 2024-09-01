import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drawing } from './entities/drawing.entity';
import { DrawingsResolver } from './drawings.resolver';
import { DrawingsService } from './services/drawings.service';
import { CommonModule } from 'src/common/common.module';

@Module({
	imports: [TypeOrmModule.forFeature([Drawing]), CommonModule],
	providers: [DrawingsResolver, DrawingsService],
	exports: [DrawingsService],
})
export class DrawingsModule {}
