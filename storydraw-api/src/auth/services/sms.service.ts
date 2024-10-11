import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';
import { SmsServiceInterface } from '../interfaces/sms.service.interface';

/**
 * Service for sending SMS messages using Twilio.
 */
@Injectable()
export class SmsService implements SmsServiceInterface {
	private client: Twilio;

	constructor(private configService: ConfigService) {
		this.client = new Twilio(
			this.configService.get<string>('TWILIO_ACCOUNT_SID'),
			this.configService.get<string>('TWILIO_AUTH_TOKEN'),
		);
	}

	/**
	 * Sends an SMS message.
	 * @param to - The recipient's phone number.
	 * @param body - The body of the SMS message.
	 * @returns A promise that resolves with the message instance.
	 */
	async sendSms(to: string, body: string): Promise<MessageInstance> {
		return this.client.messages.create({
			body,
			from: this.configService.get<string>('TWILIO_PHONE_NUMBER'),
			to,
		});
	}
}
