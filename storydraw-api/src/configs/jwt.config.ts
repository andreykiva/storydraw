import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
	return {
		signOptions: { expiresIn: '60s' },
		secret: configService.get('JWT_SECRET'),
	};
};
