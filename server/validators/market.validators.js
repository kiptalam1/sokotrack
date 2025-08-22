import { checkSchema } from "express-validator";

export const marketValidators = checkSchema({
	name: {
		notEmpty: {
			errorMessage: "Name of the market is required",
		},
		isLength: {
			options: { min: 3, max: 60 },
			errorMessage: "Market name should be between 3 to 60 characters long",
		},
		trim: true,
		isString: {
			errorMessage: "Market name must include a string of letters",
		},
	},
	location: {
		optional: true, // field can be omitted
		notEmpty: {
			errorMessage: "Location cannot be empty if provided",
		},
		isLength: {
			options: { min: 3, max: 60 },
			errorMessage: "Location should be between 3 to 60 characters long",
		},
		trim: true,
		isString: {
			errorMessage: "Location must include a string of letters",
		},
	},
	county: {
		notEmpty: {
			errorMessage: "Name of the county is required",
		},
		isLength: {
			options: { min: 3, max: 60 },
			errorMessage: "County name should be between 3 to 60 characters long",
		},
		trim: true,
		isString: {
			errorMessage: "County name must include a string of letters",
		},
	},
});


export const stallValidators = checkSchema({
	stallNumber: {
		notEmpty: {
			errorMessage: "Stall number is required",
		},
		isString: {
			errorMessage: "Stall number must be a string",
		},
		trim: true,
	},
	type: {
		notEmpty: {
			errorMessage: "Stall type is required",
		},
		isIn: {
			options: [["retail", "wholesale", "food", "other"]],
			errorMessage: "Stall type must be one of: retail, wholesale, food, other",
		},
	},
	monthlyRent: {
		notEmpty: {
			errorMessage: "Monthly rent is required",
		},
		isFloat: {
			options: { min: 0 },
			errorMessage: "Monthly rent must be a positive number",
		},
		toFloat: true, // convert string → float automatically
	},
});
