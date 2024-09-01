import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/configs/jwt.config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { VerificationsModule } from 'src/verifications/verifications.module';
import { SmsService } from './services/sms.service';
import { EmailService } from './services/email.service';
import { TokenService } from './services/token.service';

@Module({
	imports: [
		PassportModule,
		UsersModule,
		VerificationsModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
	],
	providers: [AuthService, AuthResolver, JwtStrategy, SmsService, EmailService, TokenService],
})
export class AuthModule {}
