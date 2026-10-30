const bookingService = require("../services/bookingService");
const { sendError } = require("../utils/httpError");

const create = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.user.id, req.body);
    return res.status(201).json(booking);
  } catch (error) {
    return sendError(res, error);
  }
};

// req.booking lo deja authorizeBooking
const getOne = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.booking.id);
    return res.status(200).json(booking);
  } catch (error) {
    return sendError(res, error);
  }
};

const update = async (req, res) => {
  try {
    const booking = await bookingService.updateBooking(req.booking, req.body);
    return res.status(200).json(booking);
  } catch (error) {
    return sendError(res, error);
  }
};

const remove = async (req, res) => {
  try {
    await bookingService.deleteBooking(req.booking.id);
    return res.status(204).send();
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = { create, getOne, update, remove };
