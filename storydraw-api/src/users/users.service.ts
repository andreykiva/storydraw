import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'bcryptjs';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

	async create(createUserInput: CreateUserInput) {
		let hashedPassword = null;

		if (createUserInput.password) {
			hashedPassword = await hash(createUserInput.password, 10);
		}

		const newUser = this.usersRepository.create({
			...createUserInput,
			password: hashedPassword,
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

	findUserByPhoneNumber(phoneNumber: string) {
		return this.usersRepository.findOneBy({ phoneNumber });
	}
}
