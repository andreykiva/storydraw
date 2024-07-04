import { Verification } from './entities/verification.entity';

export interface IVerificationsService {
	create(identifier: string): Promise<Verification>;
	confirmCode(identifier: string, code: string): Promise<void>;
	findOne(identifier: string): Promise<Verification>;
	delete(verification: Verification): Promise<void>;
	deleteOld(): Promise<void>;
}
