const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact} = require('../../controllers/contactsController')
const { isEmptyBody } = require('../../middlewares/isEmptyBody')
const { validateBody } = require('../../middlewares/validateBody')
const { isValidId } = require('../../middlewares/isValidId')
const { updateContactSchema, addContactSchema } = require('../../schemas/contactsSchema')


const router = express.Router()

router.get('/', listContacts)

router.get('/:contactId', isValidId, getContactById)

router.post('/', isEmptyBody, validateBody(addContactSchema), addContact)

router.delete('/:contactId', isValidId, removeContact)

router.put('/:contactId', isEmptyBody, validateBody(updateContactSchema), isValidId, updateContact)

module.exports = router
