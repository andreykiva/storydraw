import { Injectable } from '@nestjs/common';
import { generateRandomNumber } from 'src/common/utils/number.utils';

@Injectable()
export class UsernameService {
	generateUsername(): string {
		return 'user' + generateRandomNumber(12, 18);
	}
}
