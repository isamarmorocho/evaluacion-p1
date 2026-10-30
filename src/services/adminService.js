const prisma = require("../utils/prisma");
const { httpError } = require("../utils/httpError");

const createSchedule = async ({ court, startTime, endTime }) => {
  if (!court || typeof court !== "string" || !startTime || !endTime) {
    throw httpError(400, "court, startTime y endTime son obligatorios");
  }
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw httpError(400, "startTime y endTime deben ser fechas válidas");
  }
  if (end <= start) {
    throw httpError(400, "endTime debe ser posterior a startTime");
  }
  return prisma.schedule.create({
    data: { court, startTime: start, endTime: end },
  });
};

const getAllBookings = async () =>
  prisma.booking.findMany({
    include: {
      user: { select: { id: true, name: true, email: true, role: true } },
      schedule: true,
    },
    orderBy: { id: "asc" },
  });

module.exports = { createSchedule, getAllBookings };
