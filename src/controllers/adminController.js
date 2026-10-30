const { createSchedule, getAllBookings } = require("../services/adminService");

const isAdmin = (req) => req.user && req.user.role === "ADMIN";

const postSchedule = async (req, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ error: "Acceso solo para ADMIN" });
  }
  try {
    const { court, startTime, endTime } = req.body;
    if (!court || !startTime || !endTime) {
      return res
        .status(400)
        .json({ error: "court, startTime y endTime son obligatorios" });
    }
    const schedule = await createSchedule({ court, startTime, endTime });
    return res.status(201).json(schedule);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getBookings = async (req, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ error: "Acceso solo para ADMIN" });
  }
  try {
    const bookings = await getAllBookings();
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { postSchedule, getBookings };
