import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationOptions = {
	exceptionFactory: (errors: ValidationError[]) => {
		const messages = {};

		errors.forEach((error) => {
			const key = error.property;
			const constraints = Object.values(error.constraints);
			if (constraints.length > 0) {
				messages[key] = constraints[0];
			}
		});

		return new BadRequestException(messages);
	},
};
