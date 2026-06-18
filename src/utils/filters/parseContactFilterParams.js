import { typeList } from '../../constants/contacts.js';

const parseContactType = value => {
  if (typeof value !== 'string') return;

  if (typeList.includes(value.trim().toLowerCase())) {
    return value.toLowerCase();
  }

  return;
};

const parseContactIsFavorite = value => {
  if (typeof value !== 'string') return;

  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;

  return;
};

const parseEmail = value => {
  if (typeof value === 'string') {
    const email = value.trim().toLowerCase();

    return email || undefined;
  }

  return;
};

export const parseContactFilterParams = ({
  contactType,
  isFavourite,
  email,
}) => {
  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseContactIsFavorite(isFavourite);
  const parsedEmail = parseEmail(email);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
    email: parsedEmail,
  };
};
