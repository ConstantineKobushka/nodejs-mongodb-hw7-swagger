import { Router } from 'express';

import * as contactController from '../controllers/contacts.js';

import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(contactController.getContactsController));

contactsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(contactController.getContactsByIdController)
);

contactsRouter.post(
  '/',
  // upload.fields([{name: "poster", maxCount: 1}, {name: "subposter", maxCount: 4}])
  // upload.array("poster", 8)
  upload.single('photo'),
  validateBody(contactAddSchema),
  ctrlWrapper(contactController.addContactController)
);

contactsRouter.put(
  '/:id',
  upload.single('photo'),
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(contactController.upsertContactController)
);

contactsRouter.patch(
  '/:id',
  upload.single('photo'),
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(contactController.patchContactController)
);

contactsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contactController.deleteContactController)
);

export default contactsRouter;
