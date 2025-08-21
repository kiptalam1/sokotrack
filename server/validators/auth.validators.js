import { checkSchema } from "express-validator";

export const registerUserValidator = checkSchema({
	name: {
		notEmpty: {
			errorMessage: "Name is required",
		},
		isString: {
			errorMessage: "Name must be a string",
		},
		isLength: {
			options: { min: 3 },
			errorMessage: "Name should be at least 3 characters long",
		},
		trim: true,
	},
	email: {
		notEmpty: {
			errorMessage: "Email is required",
		},
		isEmail: {
			errorMessage: "Must be a valid email",
		},
		isString: {
			errorMessage: "Email must be a string",
		},
		trim: true,
	},
	password: {
		notEmpty: {
			errorMessage: "Password is required",
		},
		isLength: {
			options: { min: 8 },
			errorMessage: "Password must be at least 8 characters long",
		},
	},
});
