const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact} = require('../../controllers/contactsController')
const { isEmptyBody } = require('../../middlewares/isEmptyBody')


const router = express.Router()

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', isEmptyBody, addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', isEmptyBody, updateContact)

module.exports = router
