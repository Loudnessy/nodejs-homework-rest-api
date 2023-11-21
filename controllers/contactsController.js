const fs = require('fs/promises');
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const { addContactSchema, updateContactSchema } = require('../schemas/contactsSchema');
const { httpError } = require('../helpers/httpError');
const pathContacts = path.resolve("models", "contacts.json")
const listContacts = async (req, res, next) => {
try {
  const contacts = JSON.parse(await fs.readFile(pathContacts, "utf-8"))
  res.json(contacts) 
} catch (error) {
   next(error)
}
}

const getContactById = async (req, res, next) => {
try {
 const contacts = JSON.parse(await fs.readFile(pathContacts, "utf-8")) 
 const contactWithId = contacts.find(contact => contact.id === req.params.contactId)
 if (contactWithId === undefined) {
  throw httpError(404, `Contact with ${req.params.contactId} is not found`)
}
res.json(contactWithId)
} catch (error) {
  next(error)
}
}

const removeContact = async (req, res, next) => {
try {
 const contacts = JSON.parse(await fs.readFile(pathContacts, "utf-8")) 
 const contactIdIndex = contacts.findIndex(contact => contact.id === req.params.contactId)
 if (contactIdIndex === -1) {
    throw httpError(404, 'Not found')
  }
  contacts.splice(contactIdIndex, 1)
  await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2))
  res.json({message: 'Contact deleted'})
} catch (error) {
  next(error)
}
}

const addContact = async (req, res, next) => {
try {
  const {error} = addContactSchema.validate(req.body)
  if (error) {
    throw httpError(400, error.message)
  }
  const newContact = {...req.body, id: uuidv4()}
  const contacts = JSON.parse(await fs.readFile(pathContacts, "utf-8"))
  contacts.push(newContact)
  await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2))
  res.json(newContact)
} catch (error) {
  next(error)
}
}

const updateContact = async (req, res, next) => {
try {
  const {error} = updateContactSchema.validate(req.body)
  if (error) {
    throw httpError(400, error.message)
  }
 const contacts = JSON.parse(await fs.readFile(pathContacts, "utf-8")) 
 const contactIdIndex = contacts.findIndex(contact => contact.id === req.params.contactId)
 if (contactIdIndex === -1) {
  throw httpError(404, 'Not found')
}
const newObj = {...contacts[contactIdIndex], ...req.body}
contacts.splice(contactIdIndex, 1, newObj)
await fs.writeFile(pathContacts, JSON.stringify(contacts, null, 2))
res.json(newObj)
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


