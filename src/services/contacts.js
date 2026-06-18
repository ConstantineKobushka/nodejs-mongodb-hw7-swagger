import ContactCollection from '../db/models/Contact.js';
import { calcPaginationdata } from '../utils/calcPaginationdata.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;

  const contactsQuery = ContactCollection.find(); // отримуємо об'єкт запиту

  if (filter.contactType !== undefined) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  if (filter.email) {
    contactsQuery.where('email').equals(filter.email);
  }

  const total = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments(); // countDocuments повертає загальну кількість обєктів

  const data = await contactsQuery
    .skip(skip)
    .limit(limit) // пропусти перші skip об'єкта і поверни наступні limit
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationdata({ total, page, perPage });

  return {
    data,
    ...paginationData,
  };
};

export const getContact = filter => ContactCollection.findOne(filter);

export const getContactById = id => ContactCollection.findById(id);

export const addContact = contactData => ContactCollection.create(contactData);

export const updateContact = async (filter, contactData, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactCollection.findOneAndUpdate(
    filter,
    {
      $set: contactData,
    },
    {
      upsert,
      includeResultMetadata: true,
    }
  );

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return { isNew, data: result.value };
};

export const deletContact = filter =>
  ContactCollection.findOneAndDelete(filter);
