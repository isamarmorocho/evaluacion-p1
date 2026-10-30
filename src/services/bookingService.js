const prisma = require("../utils/prisma");
const { httpError } = require("../utils/httpError");

const parseBookingInput = ({ date, scheduleId }) => {
  let parsedDate;
  if (date !== undefined) {
    parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw httpError(400, "date debe ser una fecha válida");
    }
  }
  let parsedScheduleId;
  if (scheduleId !== undefined) {
    parsedScheduleId = Number(scheduleId);
    if (!Number.isInteger(parsedScheduleId)) {
      throw httpError(400, "scheduleId debe ser un número entero");
    }
  }
  return { date: parsedDate, scheduleId: parsedScheduleId };
};

const ensureSchedule = async (scheduleId) => {
  const schedule = await prisma.schedule.findUnique({
    where: { id: scheduleId },
  });
  if (!schedule) throw httpError(404, "El horario no existe");
};

const createBooking = async (userId, body) => {
  if (body.date === undefined || body.scheduleId === undefined) {
    throw httpError(400, "date y scheduleId son obligatorios");
  }
  const { date, scheduleId } = parseBookingInput(body);
  await ensureSchedule(scheduleId);

  const taken = await prisma.booking.findFirst({ where: { date, scheduleId } });
  if (taken) throw httpError(400, "El horario ya está ocupado");

  return prisma.booking.create({ data: { date, scheduleId, userId } });
};

const getBookingById = async (id) =>
  prisma.booking.findUnique({
    where: { id },
    include: { schedule: true },
  });

const updateBooking = async (booking, body) => {
  const parsed = parseBookingInput(body);
  const date = parsed.date ?? booking.date;
  const scheduleId = parsed.scheduleId ?? booking.scheduleId;
  if (parsed.scheduleId !== undefined) await ensureSchedule(scheduleId);

  const taken = await prisma.booking.findFirst({
    where: { date, scheduleId, NOT: { id: booking.id } },
  });
  if (taken) throw httpError(400, "El horario ya está ocupado");

  return prisma.booking.update({
    where: { id: booking.id },
    data: { date, scheduleId },
  });
};

const deleteBooking = async (id) => prisma.booking.delete({ where: { id } });

module.exports = {
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
};
