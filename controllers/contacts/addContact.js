const { httpError } = require('../../helpers/httpError');
const { Contact } = require('../../models/contact');

const addContact = async (req, res, next) => {
    try {
      const {_id} = req.user
      const contact = await Contact.create({...req.body, owner: _id})
      res.status(201).json(contact)
    } catch (error) {
      next(error)
    }
    }
    module.exports = addContact