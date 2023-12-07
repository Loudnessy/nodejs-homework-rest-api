const { httpError } = require('../../helpers/httpError');
const { Contact } = require('../../models/contact');

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
    module.exports = updateContact