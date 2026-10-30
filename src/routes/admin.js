const { Router } = require("express");
const authenticateToken = require("../middlewares/auth");
const { postSchedule, getBookings } = require("../controllers/adminController");

const router = Router();

router.post("/schedules", authenticateToken, postSchedule);
router.get("/bookings", authenticateToken, getBookings);

module.exports = router;
