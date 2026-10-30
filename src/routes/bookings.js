const { Router } = require("express");
const authenticateToken = require("../middlewares/auth");
const authorizeBooking = require("../middlewares/authorizeBooking");
const {
  create,
  getOne,
  update,
  remove,
} = require("../controllers/bookingController");

const router = Router();

router.post("/", authenticateToken, create);
router.get("/:id", authenticateToken, authorizeBooking, getOne);
router.put("/:id", authenticateToken, authorizeBooking, update);
router.delete("/:id", authenticateToken, authorizeBooking, remove);

module.exports = router;
