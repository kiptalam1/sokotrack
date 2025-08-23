import { checkSchema } from "express-validator";

export const updateMarketValidators = checkSchema({
	name: {
		optional: true,
		notEmpty: {
			errorMessage: "Market name cannot be empty if provided",
		},
		isLength: {
			options: { min: 3, max: 60 },
			errorMessage: "Market name should be between 3 to 60 characters long",
		},
		isString: {
			errorMessage: "Market name must include a string of letters",
		},
		trim: true,
	},
	location: {
		optional: true,
		notEmpty: {
			errorMessage: "Location cannot be empty if provided",
		},
		isLength: {
			options: { min: 3, max: 60 },
			errorMessage: "Location should be between 3 to 60 characters long",
		},
		isString: {
			errorMessage: "Location must include a string of letters",
		},
		trim: true,
	},
	county: {
		optional: true,
		notEmpty: {
			errorMessage: "County name cannot be empty if provided",
		},
		isLength: {
			options: { min: 3, max: 60 },
			errorMessage: "County name should be between 3 to 60 characters long",
		},
		isString: {
			errorMessage: "County name must include a string of letters",
		},
		trim: true,
	},
});

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


export const updateStallValidators = checkSchema({
	stallNumber: {
		optional: true,
		notEmpty: {
			errorMessage: "Stall number cannot be empty if provided",
		},
		isString: {
			errorMessage: "Stall number must be a string",
		},
		trim: true,
	},
	type: {
		optional: true,
		notEmpty: {
			errorMessage: "Stall type cannot be empty if provided",
		},
		isIn: {
			options: [["retail", "wholesale", "food", "other"]],
			errorMessage: "Stall type must be one of: retail, wholesale, food, other",
		},
	},
	monthlyRent: {
		optional: true,
		notEmpty: {
			errorMessage: "Monthly rent cannot be empty if provided",
		},
		isFloat: {
			options: { min: 0 },
			errorMessage: "Monthly rent must be a positive number",
		},
		toFloat: true,
	},
	status: {
		optional: true,
		notEmpty: {
			errorMessage: "Status cannot be empty if provided",
		},
		isIn: {
			options: [["available", "occupied", "reserved", "maintenance"]],
			errorMessage:
				"Status must be one of: available, occupied, reserved, maintenance",
		},
	},
});
