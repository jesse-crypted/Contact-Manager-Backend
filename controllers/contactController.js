const Contact = require('./../models/contactModel.js');
const asyncHandler = require('express-async-handler');

// @desc Get all contacts
// @route GET /api/contacts
// @access public
exports.getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access public
// exports.getContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error('Contact not found');
//   }
//   res.status(200).json(contact);
// });

exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        contact,
      },
    });
  } catch (err) {
    res.status(404).json({
      title: 'Not Found',
      message: err.message,
      stackTrace: err.stack,
    });
  }
};

// @desc Get contact
// @route GET /api/contacts/:id
// @access public
exports.createContact = asyncHandler(async (req, res) => {
  console.log('The request body is: ', req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }

  const newContact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(newContact);
});

// @desc Update contact
// @route GET /api/contacts/:id
// @access public
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(contact);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
      stackTrace: err.stack,
    });
  }
};

// @desc Delete contact
// @route GET /api/contacts/:id
// @access public
exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
