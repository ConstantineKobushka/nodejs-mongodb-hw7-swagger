import Joi from 'joi';

import { emailRegexp } from '../constants/user.js';

export const authRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name must contain at least 3 characters.',
    'string.max': 'Name must contain at most 20 characters.',
    'any.required': 'Name is required.',
  }),

  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),

  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password is required.',
    'string.min': 'Password must contain at least 6 characters.',
    'any.required': 'Password is required.',
  }),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),

  password: Joi.string().required().messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password is required.',
    'any.required': 'Password is required.',
  }),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    'string.pattern.base': 'Please provide a valid email address.',
    'any.required': 'Email is required.',
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password is required.',
    'string.min': 'Password must contain at least 6 characters.',
    'any.required': 'Password is required.',
  }),
  token: Joi.string().required().messages({
    'string.base': 'Token must be a string.',
    'string.empty': 'Token is required.',
    'any.required': 'Token is required.',
  }),
});

export const googleOAuthSchema = Joi.object({
  code: Joi.string().required().messages({
    'string.base': 'Code must be a string.',
    'string.empty': 'Code is required.',
    'any.required': 'Code is required.',
  }),
});
