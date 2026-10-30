const prisma = require("../lib/prisma");

const createSchedule = async ({ court, startTime, endTime }) => {
  return prisma.schedule.create({
    data: {
      court,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    },
  });
};

const getAllBookings = async () => {
  return prisma.booking.findMany({
    include: { user: true, schedule: true },
  });
};

module.exports = { createSchedule, getAllBookings };
