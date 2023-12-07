const { httpError } = require('../../helpers/httpError');
const { Contact } = require('../../models/contact');
const listContacts = async (req, res, next) => {
    try {
      const {_id} = req.user
      const {page=1, limit=10, favorite="false"} = req.query
      const skip = (page - 1) * limit
      const contacts = await Contact.find({owner: _id, favorite}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "_id email")
      const total = await Contact.countDocuments()
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
    module.exports = listContacts