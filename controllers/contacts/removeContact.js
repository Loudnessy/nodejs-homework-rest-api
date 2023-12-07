const { httpError } = require('../../helpers/httpError');
const { Contact } = require('../../models/contact');

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
    module.exports = removeContact