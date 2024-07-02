import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getOrmConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: configService.get('POSTGRES_HOST') || 'localhost',
	port: configService.get<number>('POSTGRES_HOST_PORT') || 5432,
	username: configService.get('POSTGRES_USER') || 'postgres',
	password: configService.get('POSTGRES_PASSWORD') || 'postgres',
	database: configService.get('POSTGRES_DATABASE') || 'postgres',
	entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
	synchronize: true,
	migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});
