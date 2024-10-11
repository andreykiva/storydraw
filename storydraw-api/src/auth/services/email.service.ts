import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailServiceInterface } from '../interfaces/email.service.interface';

/**
 * Service for sending emails.
 * Uses nodemailer to send emails via SMTP.
 */
@Injectable()
export class EmailService implements EmailServiceInterface {
	private transporter: nodemailer.Transporter;

	constructor(private readonly configService: ConfigService) {
		this.transporter = nodemailer.createTransport({
			host: this.configService.get<string>('SMTP_HOST'),
			port: parseInt(this.configService.get<string>('SMTP_PORT'), 10),
			secure: this.configService.get<string>('SMTP_SECURE') === 'true',
			auth: {
				user: this.configService.get<string>('SMTP_USER'),
				pass: this.configService.get<string>('SMTP_PASS'),
			},
		});
	}

	/**
	 * Sends a verification code to the specified email.
	 * @param email - The recipient's email address.
	 * @param code - The verification code.
	 * @throws {Error} If the email cannot be sent.
	 */
	async sendVerificationCode(email: string, code: string): Promise<void> {
		const mailOptions = {
			from: this.configService.get<string>('FROM_EMAIL'),
			to: email,
			subject: 'StoryDraw | Your Verification Code',
			text: `Your verification code is ${code}`,
			html: `<strong>Your verification code is ${code}</strong>`,
		};

		await this.transporter.sendMail(mailOptions);
	}
}
