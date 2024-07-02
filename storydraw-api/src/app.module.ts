import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { getOrmConfig } from './configs/orm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VerificationsModule } from './verifications/verifications.module';
import { SmsModule } from './sms/sms.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from './email/email.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getOrmConfig,
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: 'src/schema.gql',
		}),
		UsersModule,
		AuthModule,
		VerificationsModule,
		SmsModule,
		EmailModule,
		ScheduleModule.forRoot(),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
