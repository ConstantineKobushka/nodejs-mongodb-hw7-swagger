import createError from 'http-errors';

import * as contactService from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToUploadsDir } from '../utils/saveFileToUploadsDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { extractFileIdFromCloudinary } from '../utils/extractFileIdFromCloudinary.js';
import { deleteFileFromCloudinary } from '../utils/deleteFileFromCloudinary.js';
import { sortByList } from '../db/models/Contact.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseContactFilterParams(req.query);
  filter.userId = req.user._id;

  const data = await contactService.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;
  const data = await contactService.getContact({ _id, userId });

  if (!data) {
    throw createError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id=${_id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const cloudinaryEnable = getEnvVar('CLOUDINARY_ENABLE') === 'true';
  let photo;

  if (req.file) {
    if (cloudinaryEnable) {
      photo = await saveFileToCloudinary(req.file);
    } else {
      photo = await saveFileToUploadsDir(req.file);
    }
  }

  const { _id: userId } = req.user;
  const contact = await contactService.addContact({
    ...req.body,
    photo,
    userId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const upsertContactController = async (req, res) => {
  const cloudinaryEnable = getEnvVar('CLOUDINARY_ENABLE') === 'true';
  let photo;

  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  const existingContact = await contactService.getContactById(_id);

  if (req.file) {
    if (cloudinaryEnable && existingContact?.photo) {
      const publicId = extractFileIdFromCloudinary(existingContact.photo);
      await deleteFileFromCloudinary(publicId);
    }

    photo = cloudinaryEnable
      ? await saveFileToCloudinary(req.file)
      : await saveFileToUploadsDir(req.file);
  }

  const { isNew, data } = await contactService.updateContact(
    { _id, userId },
    { ...req.body, userId, photo },
    {
      upsert: true,
    }
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    massage: 'Successfully upserte contact',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const cloudinaryEnable = getEnvVar('CLOUDINARY_ENABLE') === 'true';
  let photo;

  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  const existingContact = await contactService.getContactById(_id);

  if (req.file) {
    if (cloudinaryEnable && existingContact?.photo) {
      const publicId = extractFileIdFromCloudinary(existingContact.photo);
      await deleteFileFromCloudinary(publicId);
    }

    photo = cloudinaryEnable
      ? await saveFileToCloudinary(req.file)
      : await saveFileToUploadsDir(req.file);
  }

  const contact = await contactService.updateContact(
    { _id, userId },
    { ...req.body, userId, photo }
  );

  if (!contact) {
    throw createError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    massage: 'Successfully update contact',
    data: contact.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactService.deletContact({ _id, userId });

  if (!data) {
    throw createError(404, `Contact with id=${_id} not found`);
  }

  res.status(204).send();
};
