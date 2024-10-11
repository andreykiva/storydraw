import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

/**
 * SmsServiceInterface - Interface for the SMS service.
 *
 * Describes methods for sending SMS messages.
 */
export interface SmsServiceInterface {
	/**
	 * Sends an SMS message to the specified recipient.
	 *
	 * @param to - The phone number of the recipient in E.164 format.
	 * @param body - The content of the SMS message to be sent.
	 * @returns A Promise that resolves to a MessageInstance containing details about the sent message.
	 */
	sendSms(to: string, body: string): Promise<MessageInstance>;
}
