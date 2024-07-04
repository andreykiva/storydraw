import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
	private transporter: nodemailer.Transporter;

	constructor(private configService: ConfigService) {
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

	async sendVerificationCode(email: string, code: string): Promise<void> {
		const mailOptions = {
			from: this.configService.get<string>('FROM_EMAIL'),
			to: email,
			subject: 'Your Verification Code',
			text: `Your verification code is ${code}`,
			html: `<strong>Your verification code is ${code}</strong>`,
		};

		await this.transporter.sendMail(mailOptions);
	}
}
