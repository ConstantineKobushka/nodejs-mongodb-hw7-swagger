import { Schema, model } from 'mongoose';

import { saveErrorHandler, setUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constants/user.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.post('save', saveErrorHandler);
userSchema.pre('findOneAndUpdate', setUpdateSettings);
userSchema.post('findOneAndUpdate', saveErrorHandler);

const UserCollection = model('user', userSchema);

export default UserCollection;
