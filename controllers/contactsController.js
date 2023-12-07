const { httpError } = require('../helpers/httpError');
const { Contact } = require('../models/contact');
const listContacts = async (req, res, next) => {
try {
  const {_id} = req.user
  const {page=1, limit=10, favorite="false"} = req.query
  const skip = (page - 1) * limit
  const contacts = await Contact.find({owner: _id, favorite}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "_id email")
  const total = await Contact.countDocuments()
  console.log(total);
  res.json({
    total,
    page,
    limit,
    contacts
  }) 
} catch (error) {
   next(error)
}
}

const getContactById = async (req, res, next) => {
try {
  const {_id} = req.user
  const {contactId} = req.params
 const contact = await Contact.findOne({_id: contactId, owner: _id})
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
  const {_id} = req.user
  const {contactId} = req.params
 const contact = await Contact.findOneAndDelete({_id: contactId, owner: _id})
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
  const {_id} = req.user
  const contact = await Contact.create({...req.body, owner: _id})
  res.status(201).json(contact)
} catch (error) {
  next(error)
}
}

const updateContact = async (req, res, next) => {
try {
  const {_id} = req.user
 const {contactId} = req.params
 const contact = await Contact.findOneAndUpdate({_id: contactId, owner: _id}, req.body)
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


