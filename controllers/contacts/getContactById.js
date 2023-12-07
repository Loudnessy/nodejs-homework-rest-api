const { httpError } = require('../../helpers/httpError');
const { Contact } = require('../../models/contact');
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
    module.exports = getContactById