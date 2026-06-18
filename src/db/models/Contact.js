import { Schema, model } from 'mongoose';

import { typeList } from '../../constants/contacts.js';
import { saveErrorHandler, setUpdateSettings } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },
    contactType: {
      type: String,
      enum: typeList,
      default: 'personal',
      required: true,
    },
    photo: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const sortByList = ['name', 'phoneNumber'];

contactSchema.post('save', saveErrorHandler);
contactSchema.pre('findOneAndUpdate', setUpdateSettings);
contactSchema.post('findOneAndUpdate', saveErrorHandler);

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;
