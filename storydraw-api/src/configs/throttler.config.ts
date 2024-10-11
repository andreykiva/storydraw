import { ConfigService } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const getThrollerConfig = async (configService: ConfigService): Promise<ThrottlerModuleOptions> => [
	{
		ttl: configService.get('THROTTLE_TTL'),
		limit: configService.get('THROTTLE_LIMIT'),
	},
];
