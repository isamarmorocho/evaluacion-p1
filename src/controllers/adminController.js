const adminService = require("../services/adminService");
const { sendError } = require("../utils/httpError");

const isAdmin = (req, res) => {
  if (req.user?.role !== "ADMIN") {
    res.status(403).json({ error: "Acceso denegado: se requiere rol ADMIN" });
    return false;
  }
  return true;
};

const createSchedule = async (req, res) => {
  if (!isAdmin(req, res)) return;
  try {
    const schedule = await adminService.createSchedule(req.body);
    return res.status(201).json(schedule);
  } catch (error) {
    return sendError(res, error);
  }
};

const getAllBookings = async (req, res) => {
  if (!isAdmin(req, res)) return;
  try {
    const bookings = await adminService.getAllBookings();
    return res.status(200).json(bookings);
  } catch (error) {
    return sendError(res, error);
  }
};

module.exports = { createSchedule, getAllBookings };
