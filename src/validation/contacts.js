import Joi from 'joi';

import { typeList } from '../constants/contacts.js';
import { emailRegexp } from '../constants/user.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name must contain at least 3 characters.',
    'string.max': 'Name must contain at most 20 characters.',
    'any.required': 'Name is required.',
  }),

  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Phone number must be a string.',
    'string.empty': 'Phone number is required.',
    'string.min': 'Phone number must contain at least 3 characters.',
    'string.max': 'Phone number must contain at most 20 characters.',
    'any.required': 'Phone number is required.',
  }),

  email: Joi.string().pattern(emailRegexp).allow(null, '').messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email is required.',
    'string.pattern.base': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),

  isFavourite: Joi.boolean().default(false).messages({
    'boolean.base': 'isFavourite must be a boolean value.',
  }),

  contactType: Joi.string()
    .valid(...typeList)
    .default('personal')
    .required()
    .messages({
      'any.only': "Accepted values are only 'personal', 'home', or 'work'.",
      'any.required': 'Contact type is required.',
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name must contain at least 3 characters.',
    'string.max': 'Name must contain at most 20 characters.',
    'any.required': 'Name is required.',
  }),

  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.base': 'Phone number must be a string.',
    'string.empty': 'Phone number is required.',
    'string.min': 'Phone number must contain at least 3 characters.',
    'string.max': 'Phone number must contain at most 20 characters.',
    'any.required': 'Phone number is required.',
  }),

  email: Joi.string().pattern(emailRegexp).allow(null, '').messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email is required.',
    'string.pattern.base': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),

  isFavourite: Joi.boolean().default(false).messages({
    'boolean.base': 'isFavourite must be a boolean value.',
  }),

  contactType: Joi.string()
    .valid(...typeList)
    .default('personal')
    .messages({
      'any.only': "Accepted values are only 'personal', 'home', or 'work'.",
      'any.required': 'Contact type is required.',
    }),
});
