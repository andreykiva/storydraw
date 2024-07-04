import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
	private client: any;

	constructor(private configService: ConfigService) {
		this.client = new Twilio(
			this.configService.get<string>('TWILIO_ACCOUNT_SID'),
			this.configService.get<string>('TWILIO_AUTH_TOKEN'),
		);
	}

	async sendSms(to: string, body: string): Promise<any> {
		return this.client.messages.create({
			body,
			from: this.configService.get<string>('TWILIO_PHONE_NUMBER'),
			to,
		});
	}
}
