import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'bcryptjs';
import { CreateUserInput } from './dto/create-user.input';
import { generateRandomNumber } from 'src/common/utils/numberUtils';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

	async create(createUserInput: CreateUserInput) {
		let hashedPassword = null;
		let username = null;

		if (createUserInput.password) {
			hashedPassword = await hash(createUserInput.password, 10);
		}

		if (!createUserInput.username) {
			username = 'user' + generateRandomNumber(12, 18);
		}

		const newUser = this.usersRepository.create({
			...createUserInput,
			password: hashedPassword,
			username,
			displayName: username,
		});

		return this.usersRepository.save(newUser);
	}

	findAll() {
		return this.usersRepository.find();
	}

	findUserByUsername(username: string) {
		return this.usersRepository.findOneBy({ username });
	}

	findUserByEmail(email: string) {
		return this.usersRepository.findOneBy({ email });
	}

	findUserByPhone(phone: string) {
		return this.usersRepository.findOneBy({ phone });
	}
}
