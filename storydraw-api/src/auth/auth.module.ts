import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/configs/jwt.config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { VerificationsModule } from 'src/verifications/verifications.module';
import { SmsModule } from 'src/sms/sms.module';
import { EmailModule } from 'src/email/email.module';

@Module({
	imports: [
		PassportModule,
		UsersModule,
		VerificationsModule,
		SmsModule,
		EmailModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
	],
	providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
