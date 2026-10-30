const userService = require("../services/userService");
const { sendError } = require("../utils/httpError");

const getBookings = async (req, res) => {
  try {
    const bookings = await userService.getUserBookings(Number(req.params.id));
    return res.status(200).json(bookings);
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = { getBookings };
