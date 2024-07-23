import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
	return {
		signOptions: { expiresIn: '15m' },
		secret: configService.get('ACCESS_TOKEN_SECRET'),
	};
};
