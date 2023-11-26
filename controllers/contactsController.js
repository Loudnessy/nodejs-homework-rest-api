const { httpError } = require('../helpers/httpError');
const { Contact } = require('../models/contact');
const listContacts = async (req, res, next) => {
try {
  const contacts = await Contact.find({}, "-createdAt -updatedAt")
  res.json(contacts) 
} catch (error) {
   next(error)
}
}

const getContactById = async (req, res, next) => {
try {
  const {contactId} = req.params
 const contact = await Contact.findById(contactId)
 if (!contact) {
  throw httpError(404, `Contact with ${contactId} is not found`)
}
res.json(contact)
} catch (error) {
  next(error)
}
}

const removeContact = async (req, res, next) => {
try {
  const {contactId} = req.params
 const contact = await Contact.findByIdAndDelete(contactId)
 if (!contact) {
    throw httpError(404, `contact with ${contactId} is not found`)
  }
res.json({message: 'Contact deleted'})
} catch (error) {
  next(error)
}
}

const addContact = async (req, res, next) => {
try {
  const contact = await Contact.create(req.body)
  res.status(201).json(contact)
} catch (error) {
  next(error)
}
}

const updateContact = async (req, res, next) => {
try {
 const {contactId} = req.params
 const contact = await Contact.findByIdAndUpdate(contactId, req.body)
 if (!contact) {
  throw httpError(404, `Contact with ${contactId} is not found`)
}
res.json(contact)
} catch (error) {
  next(error)
}
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}


