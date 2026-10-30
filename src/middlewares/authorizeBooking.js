const prisma = require("../utils/prisma");

// Debe ir después de authenticateToken.
// 404 si la reserva no existe; 403 si no es del usuario ni ADMIN.
const authorizeBooking = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un número entero" });
    }
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      return res.status(404).json({ error: "La reserva no existe" });
    }
    if (req.user.role !== "ADMIN" && booking.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "No tienes permiso sobre esta reserva" });
    }
    req.booking = booking;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizeBooking;
