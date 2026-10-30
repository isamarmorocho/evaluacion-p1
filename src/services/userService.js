const prisma = require("../utils/prisma");

const getUserBookings = async (userId) =>
  prisma.booking.findMany({
    where: { userId },
    include: { schedule: true },
    orderBy: { id: "asc" },
  });

module.exports = { getUserBookings };
